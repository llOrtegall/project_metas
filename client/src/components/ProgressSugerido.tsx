import { calcularPorcentaje } from '../utils/progress'
import { colorBackground, getColorVariant } from '../utils/funtions'
import { ProgressBar } from '../components/tremor/ProgressBar'
import { Card } from './tremor/Card'
import { Product, Sugeridos } from '../types/Metas'

const productMetaMap = {
  CHANCE: 500,
  PAGAMAS: 750,
  CHOLADITO: 650,
  PAGATODO: 1600,
  DOBLECHANCE: 2000,
  PATA_MILLONARIA: 3000,
  CHANCE_MILLONARIO: 5000,
  KASH: 500,
  GANE5: 1000
}

function DeterminarMeta(product: Product, meta: number): number {
  const divisor = productMetaMap[product]
  if (divisor) {
    return Math.ceil(meta / divisor)
  }
  return Math.ceil(meta)
}

export function ProgressSugerido({ data }: { data: Sugeridos }) {
  const porcentaje = calcularPorcentaje(data?.VTA_SUGERIDO, data?.META_SUG1)
  const color = colorBackground(parseFloat(porcentaje))
  const variant = getColorVariant(parseFloat(porcentaje))

  return (
    <Card className={`mx-auto mt-2 w-full flex flex-col gap-4 ${color}`}>
      <article className='flex gap-4 items-center justify-center'>
        <h2 className='font-semibold text-lg'>PRODUCTO SUGERIDO {data.SUGERIDO1 || 'Aun No Se Ha Definido'}</h2>
        <span>-</span>
        <h2 className='font-semibold text-lg'>N° Sugeridos Del Día {DeterminarMeta(data.SUGERIDO1, data?.META_SUG1) || '0'}</h2>
      </article>

      <article className='flex'>
        <p> Formularios Impresos: {DeterminarMeta(data.SUGERIDO1, data.VTA_SUGERIDO)}</p>
        <span className='pl-4 font-semibold' />
      </article>

      <article className='flex flex-col items-center'>
        <p> <span>Progeso Actual: </span> &bull; {porcentaje || 0} %</p>
        <ProgressBar value={parseFloat(porcentaje)} variant={variant} className='mt-3' />
      </article>

      <article>
        {
          parseFloat(porcentaje) >= 100
            ? (
              <p className='pt-2 text-center'>Buen Trabajo 😁 - Meta Completada ✅  </p>
            )
            : null
        }
      </article>
    </Card>
  )
}
