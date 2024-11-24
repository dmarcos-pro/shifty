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
      className={`${disabled ? '' : 'hidden'} p-4 rounded border border-gray-300 dark:border-gray-700 ${selected ? "bg-blue text-white" : ""}`} 
      onClick={() => toggleActiveTask(id, name, price)}
    >
      <figure className='table mx-auto'>
        <Image
          width={60}
          height={60}
          src={image}
          alt={name}
        />
      </figure>
      <div className="text-center mt-4">
        <p className='font-bold'>{name}</p>
        <p className='text-sm mt-2'>{price}&nbsp;€</p>
      </div>
    </div>
  );

};

export default Task;

