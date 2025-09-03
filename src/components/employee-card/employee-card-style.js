import {css} from 'lit';

export default css`
.card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  border: 1px solid #ddd;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.column {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field {
  margin-bottom: 15px;
  font-size: 12px;
}

.field .label {
  color:grey;
  display:block;
  margin-bottom: 5px;
}

p {
  margin: 0;
  font-size: 16px;
  color: #000;
}

.actions {
  grid-column: span 2;
  display: flex;
  justify-content: flex-start;
  gap: 8px;
}

button {
  padding: 8px 16px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #6F64B3;
  color: #fff;
  font-size: 14px;
}


button.delete-button {
  background-color:#FF6200;
}

button.edit-button, button.delete-button {
  display: flex;
  place-items: center;
  gap: 10px;
}
.actions .edit-icon {
  fill: white;
  color: white;
  width: 24px;
  height: 24px;
}

.actions .delete-icon {
  color: white;
}

`;