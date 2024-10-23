import { Link } from "react-router-dom"
import { API, API_Header } from "../../libs"
import { useEffect, useState } from "react"


export default function ScanTag() {
    const [totalIdleTags, setTotalIdleTags] = useState(0)
    const [totalInUseTags, setTotalInUseTags] = useState(0)   
    const getTotalIdleTags = async () => {
      try {
        const res = await API_Header.get('/rfid-tags/idle')
        setTotalIdleTags(res.data.total)
      } catch (error) {
        return error
    }
   }
    const getTotalInUseTags = async () => {
      try {
        const res = await API_Header.get('/rfid-tags/inuse')
        setTotalInUseTags(res.data.total)
      } catch (error) {
        return error
    }
   }

   useEffect(() => {
    getTotalIdleTags()
    getTotalInUseTags()
})
  return (
  <>
  <div className="grid grid-rows-1 grid-cols-3 grid-flow-col gap-4">
    <div>
        <Link to='/write'>
    <div  className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Write</h5>
</div>
        </Link>
    </div>
    <div>
    <Link to='/read'>
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Read</h5>
</div>
    </Link>
    </div>
    <div>
    <Link to='/clear'>
    <div  className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Clear</h5>
</div>
  </Link>
    </div>

  </div>
    <div className="grid grid-rows-1 grid-cols-2 grid-flow-col py-5"> 

   <Link to='/idletags'>
    <div  className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Idle tags {totalIdleTags}</h5>
</div>
  </Link>
  <Link to='/inusetags'>
    <div  className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">In use tags {totalInUseTags}</h5>
</div>
  </Link>
    </div>
    </>
  )
}
