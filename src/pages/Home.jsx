import { useState } from 'react'
import DropdownSelect from '@/components/DropdownSelect'
import GaugeMeter from '@/components/GaugeMeter'
import {
  AlertTriangle,
  CircleAlert,
  Clock3,
  IdCard,
  Refrigerator,
  ThumbsUp,
  UserCircle,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const kpis = [
  { label: 'Total Affected', value: '16 Units', icon: AlertTriangle },
  { label: 'Top Anomaly Type', value: '40% Pressure', icon: CircleAlert },
  { label: 'Avg. Anomaly Duration', value: '3 hrs', icon: Clock3 },
  { label: 'Feedback Today', value: '7 cases', icon: ThumbsUp },
]

const locations = [
  { value: 'sunnyvale', label: 'Sunnyvale' },
  { value: 'palo-alto', label: 'Palo Alto' },
  { value: 'san-jose', label: 'San Jose' },
  { value: 'mountain-view', label: 'Mountain View' },
]

const affectedStores = [
  {
    name: 'El Camino Real',
    score: 10,
    equipment: [
      { type: 'Refrigerators', ids: 'C33', icon: Refrigerator },
      { type: 'Display Case', ids: 'D27', icon: IdCard },
    ],
  },
  {
    name: 'North Shoreline Blvd.',
    score: 9,
    equipment: [
      { type: 'Refrigerators', ids: 'C23, C10, C2', icon: Refrigerator },
      { type: 'Display Case', ids: 'D25', icon: IdCard },
    ],
  },
  {
    name: 'San Antonio Rd.',
    score: 8,
    equipment: [{ type: 'Refrigerators', ids: 'C3, C5', icon: Refrigerator }],
  },
  {
    name: 'Miramonte Ave.',
    score: 8,
    equipment: [{ type: 'Refrigerators', ids: 'C24', icon: Refrigerator }],
  },
  {
    name: 'Skyview Dr.',
    score: 7,
    equipment: [{ type: 'Refrigerators', ids: 'C54', icon: Refrigerator }],
  },
  {
    name: 'Bernado Ave.',
    score: 7,
    equipment: [
      { type: 'Refrigerators', ids: 'C20', icon: Refrigerator },
      { type: 'Display Case', ids: 'D2', icon: IdCard },
    ],
  },
  {
    name: 'Ralstone Ave.',
    score: 6,
    equipment: [{ type: 'Display Case', ids: 'D13', icon: IdCard }],
  },
  {
    name: 'De. Anza Blvd.',
    score: 6,
    equipment: [{ type: 'Display Case', ids: 'D33', icon: IdCard }],
  },
  {
    name: 'Broadway Plaza',
    score: 5,
    equipment: [{ type: 'Display Case', ids: 'D15', icon: IdCard }],
  },
  {
    name: 'Howard Ave',
    score: 5,
    equipment: [{ type: 'Display Case', ids: 'D1', icon: IdCard }],
  },
  {
    name: 'Leona Dr.',
    score: 1,
    equipment: [{ type: 'Display Case', ids: 'D15', icon: IdCard }],
  },
  {
    name: 'Simone Blvd.',
    score: 1,
    equipment: [{ type: 'Display Case', ids: 'D1', icon: IdCard }],
  },
]

function Header() {
  return (
    <header className="h-[85px] w-full bg-[#1f323a] py-[22px] text-white">
      <div className="flex h-full items-center px-6">
        <div className="flex flex-1 items-center gap-[10px]">
          <p className="text-[25px] font-bold leading-none tracking-[-0.04em]">ARIMO</p>
          <div className="h-[41px] w-px bg-white" />
          <p className="text-[25px] font-normal leading-none">Predictive Maintenance</p>
        </div>
        <div className="flex items-center gap-[12px]">
          <UserCircle className="size-5" strokeWidth={2} />
          <p className="text-[20px] font-normal leading-none">Haruto</p>
        </div>
      </div>
    </header>
  )
}

function MetricCard({ icon: Icon, label, value }) {
  return (
    <Card className="h-[91px] min-w-[259px] gap-0 overflow-hidden rounded-[8px] border-[#f2f2f2] bg-white px-[10px] py-[6px] shadow-none">
      <CardHeader className="gap-[10px] p-0">
        <div className="flex items-center gap-2">
          <Icon className="size-[25px] text-[#21272a]" strokeWidth={1.8} />
          <p className="text-[18px] font-normal leading-normal text-[#333333]">{label}</p>
        </div>
        <CardTitle className="pl-[31px] text-[30px] font-medium leading-normal text-[#333333]">
          {value}
        </CardTitle>
      </CardHeader>
    </Card>
  )
}

function StoreCard({ store }) {
  return (
    <Card className="min-h-[275px] min-w-[265px] cursor-pointer gap-0 rounded-[10px] border-[#4d5358] bg-white py-0 shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_3px_8px_rgba(18,22,25,0.28)]">
      <CardHeader className="px-3 pb-2 pt-3">
        <CardTitle className="text-[18px] font-bold leading-normal text-[#333333]">
          {store.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col px-0">
        <div className="flex w-full justify-center px-3 pb-1 pt-1">
          <GaugeMeter value={store.score} valueLabel={`${store.score}`} />
        </div>
        <div className="mt-auto flex flex-col gap-3 px-3 pb-3 pt-2">
          {store.equipment.map((item) => (
            <div key={`${store.name}-${item.type}-${item.ids}`} className="space-y-[6px]">
              <div className="flex items-center gap-2">
                <item.icon className="size-5 text-[#4d5358]" strokeWidth={1.5} />
                <p className="text-[16px] font-normal leading-normal text-[#4d5358]">
                  {item.type}
                </p>
              </div>
              <p className="pl-7 text-[18px] font-semibold leading-normal text-[#3a4365]">
                {item.ids}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState('mountain-view')

  return (
    <div className="min-h-screen min-w-[900px] bg-white font-sans">
      <Header />
      <main>
        <section className="bg-[#dfe8ec]">
          <div className="flex flex-col justify-center gap-[22px] px-6 py-[25px]">
            <DropdownSelect
              label="Select location"
              options={locations}
              value={selectedLocation}
              onChange={setSelectedLocation}
            />
            <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
              {kpis.map((kpi) => (
                <MetricCard key={kpi.label} {...kpi} />
              ))}
            </div>
          </div>
        </section>
        <section className="bg-[#f7f7f7]">
          <div className="px-6 py-[25px]">
            <h1 className="text-[25px] font-normal leading-normal tracking-[0.5px] text-[#121619]">
              Affected Stores
            </h1>
            <div className="mt-[25px] grid grid-cols-3 gap-[28px] lg:grid-cols-5">
              {affectedStores.map((store) => (
                <StoreCard key={store.name} store={store} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-[#17252b]">
        <div className="flex h-[34px] items-center px-6 py-[22px]">
          <p className="text-[14px] font-normal leading-normal text-white">Copyright</p>
        </div>
      </footer>
    </div>
  )
}
