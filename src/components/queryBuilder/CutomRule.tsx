interface CustomRuleProps {
  value: any;
  handleOnChange: any;
}
// const CustomRule: React.FC<CustomRuleProps> = ({
//   value,
//   handleValueChange,
// }) => {
//   return (
//     <div>
//       <select
//         value={value.item}
//         onChange={(e) => handleValueChange({ ...value, item: e.target.value })}
//       >
//         <option value="">Select Item</option>
//         <option value="item1">Item 1</option>
//         <option value="item2">Item 2</option>
//         {/* Add more options as needed */}
//       </select>
//       {value.item && (
//         <>
//           <select
//             value={value.property}
//             onChange={(e) =>
//               handleValueChange({ ...value, property: e.target.value })
//             }
//           >
//             <option value="">Select Property</option>
//             {/* Add options for properties based on the selected item */}
//           </select>
//           <select
//             value={value.operator}
//             onChange={(e) =>
//               handleValueChange({ ...value, operator: e.target.value })
//             }
//           >
//             <option value="equal">Equal</option>
//             <option value="notEqual">Not Equal</option>
//             {/* Add more operator options if needed */}
//           </select>
//           <input
//             type="text"
//             value={value.inputValue}
//             onChange={(e) =>
//               handleValueChange({ ...value, inputValue: e.target.value })
//             }
//           />
//         </>
//       )}
//     </div>
//   );
// };
const CustomRule: React.FC<CustomRuleProps> = ({ value, handleOnChange }) => {
  const handleItemChange = (event: any) => {
    const newItemValue = event.target.value;
    handleOnChange({
      ...value,
      item: newItemValue,
      property: "",
      operator: "",
      inputValue: "",
    });
  };

  const handlePropertyChange = (event: any) => {
    const newPropertyValue = event.target.value;
    handleOnChange({ ...value, property: newPropertyValue });
  };

  const handleOperatorChange = (event: any) => {
    const newOperatorValue = event.target.value;
    handleOnChange({ ...value, operator: newOperatorValue });
  };

  const handleValueChange = (event: any) => {
    const newValue = event.target.value;
    handleOnChange({ ...value, inputValue: newValue });
  };

  return (
    <div>
      <select value={value.item} onChange={handleItemChange}>
        <option value="">Select Item</option>
        <option value="item1">Item 1</option>
        <option value="item2">Item 2</option>
        {/* Add more options as needed */}
      </select>
      {value.item && (
        <>
          <select value={value.property} onChange={handlePropertyChange}>
            <option value="">Select Property</option>
            {/* Add options for properties based on the selected item */}
          </select>
          <select value={value.operator} onChange={handleOperatorChange}>
            <option value="equal">Equal</option>
            <option value="notEqual">Not Equal</option>
            {/* Add more operator options if needed */}
          </select>
          <input
            type="text"
            value={value.inputValue}
            onChange={handleValueChange}
          />
        </>
      )}
    </div>
  );
};
export default CustomRule;
