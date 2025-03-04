import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@lib/components/ui/select"
import { type ServicesProps } from "@/type/component"
import content from "@contentJson"
import { useEffect } from 'react'
import { fetchServices } from "@/api/index"
import { useQuery } from "react-query"
import { PenTool, MousePointer2, Camera, ChevronRight, CheckCircle, Circle } from 'lucide-react'

type SelectedServicesProps = {
  category: 'branding' | 'digital' | 'social_media';
  cat: string;
  setCategory: (id: 'branding' | 'digital' | 'social_media') => void;
  setServiceSelected: (index: number) => void;
  serviceSelected: number;
}

const SelectedService = ({
  category,
  cat,
  setCategory,
  setServiceSelected,
  serviceSelected
}: SelectedServicesProps) => {
  const { data: services, isLoading, isError } = useQuery("services", () => fetchServices())
  
  useEffect(() => {
    if (cat && ['branding', 'digital', 'social_media'].includes(cat as string)) {
      setCategory(cat as 'branding' | 'digital' | 'social_media');
    }
  }, [cat, setCategory]);
  
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching data...</div>

  const selectService = (index: number) => () => {
    setServiceSelected(index)
  }

  const handleService = (id: 'branding' | 'digital' | 'social_media') => {
    setCategory(id)
    setServiceSelected(0)
  }
  
  const TruncateText = ({ text, length }: { text: string, length: number }) => {
    if (text.length <= length) return text;
    
    const truncated = text.slice(0, length);
    const lastSpaceIndex = truncated.lastIndexOf(" ");
    
    return lastSpaceIndex > 0 
    ? truncated.slice(0, lastSpaceIndex) + " ..." 
    : truncated + " ...";
  }
  const CATEGORY_LABELS: Record<string, string> = {
    branding: "Branding",
    digital: "Digital",
    social_media: "Social Media",
  }

  const CATEGORY_ICONS = {
    branding: PenTool,
    digital: MousePointer2,
    social_media: Camera,
  }

  return <div className='sticky top-16'>
    <header className="flex items-center gap-1 text-sm">
      <span>Je recherche une prestation</span>
      <div>
        <Select
            value={category}
            onValueChange={(value: 'branding' | 'digital' | 'social_media') => handleService(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder={CATEGORY_LABELS[category]} />
          </SelectTrigger>
          <SelectContent>
            {services && services.filter((service: ServicesProps) => !service.monthly).map((service: ServicesProps, index: number) => (
                <SelectItem
                  key={`select-service-${index}`}
                  value={service.id}
                  className={`${category === service.id ? '' : 'text-gray-400'}`}
                >
                  {service.category}
                </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </header>
    <div>
      {content.services.items[category].content.map((service, index: number) => {
        return <div
          key={`services-${index}`}
          className={`${serviceSelected === index ? 'border-blue-600' : 'border-gray-100 hover:border-blue-500 dark:bg-transparent dark:border-gray-700 hover:dark:border-blue-200'} mt-4 py-6 px-4 rounded shadow-lg border text-sm`}
          onClick={selectService(index)}
        >
          <div className="flex gap-2 justify-between items-center">
            <p>{service.title}</p>
            {serviceSelected === index ? <CheckCircle size={15} className='' /> : <Circle size={15} className='text-gray-500' />}
            {/* <p className='mt-2 text-sm text-gray-400'><TruncateText text={service.resume} length={85} /></p> */}
          </div>
        </div>
      })}
    </div>
  </div>
}

export default SelectedService