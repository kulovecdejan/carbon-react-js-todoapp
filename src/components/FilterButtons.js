import { TextInput } from "carbon-components-react";
import React from "react";

const FilterButtons = ({ filter, setFilter, searchQuery, handleSearch }) => {
  return (
    <div className="filter-wrapper">
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <TextInput
          className="text-filter"
          type="text"
          labelText="Search for a specific task:"
          placeholder="For Example: Make lunch..."
          value={searchQuery}
          onChange={handleSearch}
          style={{ padding: '10px', marginRight: '10px' }}
        />
        <div className="status-filter">
          <div
            className={filter === 'all' ? 'active yellow' : ''}
            style={{
              padding: '10px 20px',
              cursor: 'pointer',
            }}
            onClick={() => setFilter('all')}
          >
            All
          </div>
          <div
            className={filter === 'completed' ? 'active green' : ''}
            style={{
              padding: '10px 20px',
              cursor: 'pointer',
            }}
            onClick={() => setFilter('completed')}
          >
            Completed
          </div>
          <div
            className={filter === 'incompleted' ? 'active red' : ''}
            style={{
              padding: '10px 20px',
              cursor: 'pointer',
            }}
            onClick={() => setFilter('incompleted')}
          >
            Incompleted
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterButtons;