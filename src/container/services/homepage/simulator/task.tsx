import React, { useState } from "react";
import Image from "next/image"
import { TaskProps } from '@/type/task';

const Task = ({
  id,
  name,
  image,
  price,
  category,
  update,
  disabled

}: TaskProps) => {
  const [selected, setSelected] = useState(false);

  const toggleActiveTask = (id: string, name: string, price: number) => {
    update(id, name, price);
    setSelected(prev => !prev);
  };

  return (
    <div 
      id={'task-' + id} 
      className={`py-8 px-4 rounded shadow-lg border-2  ${disabled ? '' : 'hidden'} ${selected ? "border-blue " : "border-gray-100 hover:border-blue-300 dark:bg-gray-800 dark:border-gray-700 hover:dark:border-blue-200"} cursor-pointer`} 
      onClick={() => toggleActiveTask(id, name, price)}
    >
      {/* <figure className='table mx-auto'>
        <Image
          width={40}
          height={40}
          src={image}
          alt={name}
        />
      </figure> */}
      <div className="flex text-center justify-between items-center">
        <p className='font-bold'>{name}</p>
        <p className='text-sm'>{price}&nbsp;€</p>
      </div>
    </div>
  );

};

export default Task;

