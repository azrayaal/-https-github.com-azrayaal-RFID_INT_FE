import { useEffect, useState } from "react"
import { API } from "../../libs"
import InUseTags from "../mobile/inuseTag"
import { Link } from "react-router-dom"

export default function Home() {
    const [totalIdleTags, setTotalIdleTags] = useState(0)
    const [totalInUseTags, setTotalInUseTags] = useState(0)
    const [totalInbound, setTotalInbound] = useState(0)
    const [totalOutbound, setTotalOutbound] = useState(0)
    const getTotalIdleTags = async () => {
        try {
          const res = await API.get('/rfid-tags/idle')
          setTotalIdleTags(res.data.total)
        } catch (error) {
          return error
      }
     }
      const getTotalInUseTags = async () => {
        try {
          const res = await API.get('/rfid-tags/inuse')
          setTotalInUseTags(res.data.total)
        } catch (error) {
          return error
      }
     }

     const getTotalInbound = async () => {
        try {
          const res = await API.get('/receive')
          const total = res.data.length()
          setTotalIdleTags(total)
          console.log(totalIdleTags)
          setTotalInbound(res.data.total)
        } catch (error) {
          return error
      }
     }

     const getTotalOutbound = async () => {
        try {
          const res = await API.get('/loading')
          setTotalOutbound(res.data.total)
        } catch (error) {
          return error
      }
     }

     useEffect(() => {
      getTotalInbound()
      getTotalOutbound()
      getTotalIdleTags()
      getTotalInUseTags()
  }, [])
  return (
<>
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Live Time Card */}
        <div className="bg-white rounded-lg shadowCard p-6">
          <h2 className="text-xl font-semibold text-gray-500">Live Time</h2>
          <div className="text-4xl font-bold text-blue-600 my-2">
          </div>
          <div className="text-gray-500">
            {/* diambil dari user login */}
            Jakarta Timur | Sun, 17 April 2024
          </div>
        </div>

        {/* Tag Count Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-orenPos text-white rounded-lg shadowCard p-6">
          <h2 className="text-xl font-semibold">In Use Tags</h2>
          <div className="text-4xl font-bold my-2">{totalInUseTags}</div>
        </div>

        <div className="bg-orenPos text-white rounded-lg shadowCard p-6">
          <h2 className="text-xl font-semibold">Idle Tags</h2>
          <div className="text-4xl font-bold my-2">{totalIdleTags}</div>
        </div>
      </div>
      </div>
      
{/* //////////////////////////////////////////////////////////////////// */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    <Link to='/receiving' className="hover:shadow-2xl">
        <div className="bg-orenPos text-white rounded-lg shadowCard p-6">
          <h2 className="text-xl font-semibold">Inbound</h2>
          <div className="text-4xl font-bold my-2">0</div>
          <div className="text-gray-200">Inbound Details</div>
        </div>
    </Link>
    <Link to='/loading' className="hover:shadow-2xl">
        <div className="bg-orenPos text-white rounded-lg shadowCard p-6">
          <h2 className="text-xl font-semibold">Outbound</h2>
          <div className="text-4xl font-bold my-2">0</div>
          <div className="text-gray-200">Outbound Details</div>
        </div>
        </Link>
        <Link to='/scan' className="hover:shadow-2xl">
        <div className="bg-orenPos text-white rounded-lg shadowCard p-6">
          <h2 className="text-xl font-semibold">Scan</h2>
          <div className="text-4xl font-bold my-2">0</div>
          <div className="text-gray-200">Bag Error Details</div>
        </div>
        </Link>
      </div>
</>
  )
}
