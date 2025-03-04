import {
  Card,
  CardHeader,
} from "@/lib/components/ui/card"
import { ProjectsProps } from "@/type/component"
import { fontTitle } from "@/lib/components/heading"

const Project = ({ id, brand, category, selected }: ProjectsProps) => {
  return (
    <Card id={id} className={`p-4 ${selected ? 'border-blue-500' : ''}`}>
      <CardHeader className='mb-0 text-center'>
        <p className={`${fontTitle.className}`}>{brand}</p>
        <div>
          {category.map((item, index) => (
            <span
              className="uppercase inline-block text-xs text-blue bg-blue-50 dark:bg-gray-800 mr-2 py-1 px-2"
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
