import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../Components/Admin/AdminSidebar';
import FoodForm from '../../Components/Admin/FoodForm';
import Button from '../../Components/Shared/Button';
import { useAuth } from '../../Context/AuthContext';
import { getFoods, addFood, updateFood, deleteFood } from '../../Services/foodService';
import { useToast } from '../../Context/ToastContext';
import Loader from '../../Components/Shared/Loader';

function ManageFoodsPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { addToast } = useToast();
  const [foods, setFoods] = useState([]);
  const [editingFood, setEditingFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFoods() {
      try {
        const data = await getFoods();
        setFoods(data);
      } catch (error) {
        addToast('Failed to load foods', 'error');
      } finally {
        setLoading(false);
      }
    }
    loadFoods();
  }, [addToast]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleAddFood = async (foodData) => {
    try {
      const newFood = await addFood(foodData);
      setFoods([...foods, newFood]);
      addToast('Food item added!', 'success');
    } catch (error) {
      addToast(error.message || 'Failed to add food item', 'error');
    }
  };

  const handleUpdateFood = async (foodData) => {
    try {
      const updated = await updateFood(editingFood.id, foodData);
      setFoods(foods.map((food) => (food.id === editingFood.id ? updated : food)));
      setEditingFood(null);
      addToast('Food item updated!', 'success');
    } catch (error) {
      addToast(error.message || 'Failed to update food item', 'error');
    }
  };

  const handleDeleteFood = async (id) => {
    try {
      await deleteFood(id);
      setFoods(foods.filter((food) => food.id !== id));
      addToast('Food item deleted', 'success');
    } catch (error) {
      addToast('Failed to delete food item', 'error');
    }
  };

  return (
    <section className="admin-layout">
      <AdminSidebar onLogout={handleLogout} />
      <div className="admin-content">
        <h1>Manage Food Items</h1>
        <div className="admin-forms-grid">
          <div>
            <h2>Add New Food</h2>
            <FoodForm onSubmit={handleAddFood} submitLabel="Add Food Item" />
          </div>
          <div>
            <h2>{editingFood ? 'Update Food Item' : 'Select an item to edit'}</h2>
            {editingFood ? (
              <FoodForm
                key={editingFood.id} // forces recreation with new initialValues
                onSubmit={handleUpdateFood}
                submitLabel="Update Food Item"
                initialValues={editingFood}
              />
            ) : (
              <p className="hint">Click Edit on any food row to fill this form.</p>
            )}
          </div>
        </div>

        <div className="table-wrapper">
          {loading ? (
            <Loader />
          ) : (
            <table className="order-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {foods.map((food) => (
                  <tr key={food.id}>
                    <td>
                      <img src={food.imageUrl} alt={food.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                    </td>
                    <td>{food.name}</td>
                    <td>{food.category}</td>
                    <td>${food.price.toFixed(2)}</td>
                    <td className="action-row">
                      <Button variant="secondary" onClick={() => setEditingFood(food)}>
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => handleDeleteFood(food.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}

export default ManageFoodsPage;