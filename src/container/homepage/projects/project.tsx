import {
  Card,
  CardHeader,
} from "@/lib/components/ui/card"
import { ProjectsProps } from "@/type/component"

const Project = ({ id, brand, category, selected, url }: ProjectsProps) => {
  return (
    <Card id={id} className={`p-8 ${selected ? 'border-blue-500' : ''}`}>
      <CardHeader className='mb-0 text-center'>
        <p className="text-sm mb-1">{brand}</p>
        <div>
          {category.map((item, index) => (
            <span
              className={`uppercase inline-block text-xs text-blue bg-blue-50 dark:bg-gray-800 py-1 px-2 ${index !== 0 ? 'ml-2' : ''} `}
              key={`project-category-${index}`}
              >
              {item}
            </span>
          ))}
        </div>
      </CardHeader>
    </Card>
  )
}

export default Project
