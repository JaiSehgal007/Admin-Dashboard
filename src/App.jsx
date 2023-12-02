import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import delete_bin from './assets/delete_bin.png'
import delete_pic from './assets/bin.png'
import editing from './assets/editing.png'


const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const [checked, setChecked] = useState(false);

  // Fetching the user from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
        );
        const data = await response.json();
        console.log(data)
        setUsers(data.sort((a, b) => a.id - b.id));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the number of pages
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Pagination logic
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Displaying users for the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Editing user directly in the row
  const handleEdit = (user) => {
    setEditingUser(user);
  };

  // Saving the edited user
  const handleSaveEdit = () => {
    // Update the user in the dummy data
    const updatedUsers = users.map((user) =>
      user.id === editingUser.id ? editingUser : user
    );

    // Update the state with the new array of users
    setUsers(updatedUsers);
    setEditingUser(null);
  };

  // Deleting selected rows
  const handleDeleteSelected = () => {
    let updatedUsers = users.filter(
      (user) => !selectedRows.includes(user.id)
    );

    setUsers(updatedUsers);
    setSelectedRows([]);
  };

  // handling the deleting of the single row
  const handleSingleDelete = (userID) => {
    let updatedUsers = users.filter(
      (user) => user.id !== userID
    );
  
    console.log(updatedUsers);
    setUsers(updatedUsers);
  };
  
  

  // Toggling the selection of a row
  const handleRowSelect = (userId) => {
    const updatedSelectedRows = selectedRows.includes(userId)
      ? selectedRows.filter((id) => id !== userId)
      : [...selectedRows, userId];
    setSelectedRows(updatedSelectedRows);
  };

  // Selecting all rows
  const handleSelectAll = () => {
    setChecked((prev) => !prev);
    const allUserIds = filteredUsers.map((user) => user.id);
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.length === allUserIds.length ? [] : allUserIds
    );
  };

  // Deselecting all rows
  const handleDeselectAll = () => {
    setSelectedRows([]);
  };

  // Handling search on ENTER
  const handleSearchOnEnter = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Handling search
  const handleSearch = () => {
    console.log('Search triggered:', searchTerm);
  };

  const borderStyle = {
    border: '1px solid rgb(207, 207, 207)',
    backgroundColor:'white'
  };

  return (
    <div className="container">
      {selectedRows.length == 0 ?
        (<button style={{ backgroundColor: 'rgb(247, 126, 126)', borderColor: 'red' }} className="delete-all-button" onClick={handleDeleteSelected}>
          <img height={'25px'} width={'22px'} src={delete_pic} alt="" />
        </button>)
        :
        (<button style={{ backgroundColor: 'red', borderColor: 'red' }} className="delete-all-button" onClick={handleDeleteSelected}>
          <img height={'25px'} width={'22px'} src={delete_pic} alt="" />
        </button>)
      }

      <h2>Admin Dashboard</h2>

      <div className="search-bar">
        <input
          className="search-icon"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleSearchOnEnter}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={checked}
                onChange={handleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr
              key={user.id}
              className={selectedRows.includes(user.id) ? 'selected-row' : ''}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(user.id)}
                  onChange={() => handleRowSelect(user.id)}
                />
              </td>
              <td>
                {editingUser && editingUser.id === user.id ? (
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        name: e.target.value,
                      })
                    }
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingUser && editingUser.id === user.id ? (
                  <input
                    type="text"
                    value={editingUser.email}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        email: e.target.value,
                      })
                    }
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>{user.role}</td>
              <td>
                {editingUser && editingUser.id === user.id ? (
                  <button onClick={handleSaveEdit}>Save</button>
                ) : (
                  <>
                    <button style={borderStyle} onClick={() => handleEdit(user)}><img height={'20px'} width={'20px'} src={editing} alt="" /></button>
                    <button style={borderStyle} onClick={() => handleSingleDelete(user.id)}>
                      <img height={'20px'} width={'20px'} src={delete_bin} alt="" />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <div className="bottom-elements">
        <div className="selected-rows-count">
          <p>{`${selectedRows.length} rows selected out of ${filteredUsers.length}`}</p>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(1)}
          >
            First
          </button>
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            Last
          </button>


        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
