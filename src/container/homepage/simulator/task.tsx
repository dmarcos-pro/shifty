import React, { useState } from "react";
import { TaskProps } from '@/type/task';

const Task = ({
  id,
  name,
  price,
  update,
  disabled

}: TaskProps) => {
  const [selected, setSelected] = useState(false);

  const toggleActiveTask = (id: string, name: string, price: number) => {
    update(id, name, price);
    setSelected(prev => !prev);
  };

  return <li 
      id={'task-' + id} 
      className={`py-8 px-4 rounded shadow-lg border-2 flex justify-between items-center ${disabled ? '' : 'hidden'} ${selected ? "border-blue-800" : "border-gray-100 hover:border-blue-500 dark:bg-gray-800 dark:border-gray-700 hover:dark:border-blue-200"} cursor-pointer`} 
      onClick={() => toggleActiveTask(id, name, price)}
    >
      <span>{name}</span>
      <span className='text-sm text-gray-400'>{price}&nbsp;€</span>
    </li>
};

export default Task;

