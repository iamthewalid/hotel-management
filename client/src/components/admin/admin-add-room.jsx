import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const AdminAddRoom = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const roomPayload = {
      name: formData.get('name'),
      rentperday: formData.get('rentperday'),
      description: formData.get('description'),
      phonenumber: formData.get('phonenumber'),
      type: formData.get('type'),
      maxcount: formData.get('maxcount'),
      imageurls: [
        formData.get('image-url-1'),
        formData.get('image-url-2'),
        formData.get('image-url-3'),
      ],
    };

    try {
      setLoading(true);
      await axios.post('/api/rooms/create-room', roomPayload);
      toast.success('Room created successfully!');
      setLoading(false);
      setTimeout(() => {
        window.location.href = '/home';
      }, 500);
    } catch (error) {
      const message =
        error?.response?.data?.error ||
        'Something went wrong! Please try again.';
      setLoading(false);
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="row">
      <div className="col-md-5">
        <input
          name="name"
          type="text"
          className="form-control mt-2 border-dark"
          required
          placeholder="Room Name"
        />
        <input
          name="rentperday"
          type="number"
          className="form-control mt-2 border-dark"
          required
          placeholder="Rent per day"
        />
        <input
          name="maxcount"
          type="number"
          className="form-control mt-2 border-dark"
          required
          placeholder="Max room count"
        />
        <input
          name="description"
          type="text"
          className="form-control mt-2 border-dark"
          required
          placeholder="Description"
        />
        <input
          name="phonenumber"
          type="text"
          className="form-control mt-2 border-dark"
          required
          placeholder="Phone Number"
        />
      </div>
      <div className="col-md-5 admin__room-form">
        <select
          name="type"
          className="form-control mt-2 border-dark"
          required
          placeholder="delux or non-delux (No capital letters)"
        >
          <option value="delux">Delux</option>
          <option value="non-delux">Non Delux</option>
        </select>
        <input
          name="image-url-1"
          type="text"
          className="form-control mt-2 border-dark"
          required
          placeholder="Image 1"
        />
        <input
          name="image-url-2"
          type="text"
          className="form-control mt-2 border-dark"
          required
          placeholder="Image 2"
        />
        <input
          name="image-url-3"
          type="text"
          className="form-control mt-2 border-dark"
          required
          placeholder="Image 3"
        />
        <div className="text-right mt-3">
          <button disabled={loading} className="btn btn-primary" type="submit">
            {loading ? 'Processing...' : 'Add Room'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AdminAddRoom;
