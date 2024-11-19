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
    {/* <div>
        <Link to='/write'>
    <div  className="block max-w-sm p-6 bg-orange-500 hover:text-orange-500 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-white font-bold text-xl" >Write
</div>
        </Link>
    </div> */}
    <div>
    <Link to='/read'>
    <div className="block max-w-sm p-6 text-white bg-orenPos border border-gray-200 rounded-lg hover:text-orenPos shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 font-bold text-xl"> Read
</div>
    </Link>
    </div>
    <div>
    <Link to='/clear'>
    <div  className="block max-w-sm p-6 bg-gray-600 hover:text-gray-600 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-white font-bold text-xl"> Clear
</div>
  </Link>
    </div>

  </div>
    {/* <div className="grid grid-rows-1 grid-cols-2 grid-flow-col py-5"> 

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
    </div> */}
    </>
  )
}


// INSERT INTO rfid_tags ( EPC, PID, packagesCount, service, destination, originLocation, sealNumber, weight, currentLocation, tag_status, pos_hubId, created_by, created_at, created_rfid_by)
// VALUES 
// ( 'e28068100000003900728710', 'PID00223', 10, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN001', 5.0, 'Warehouse A', 'inuse', 10, 'admin', '2024-11-14 10:00:00', 1),
// ( 'aaaabbbbaaaabbbbaaaa4086', 'PID03202', 15, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN002', 8.5, 'Warehouse B', 'inuse', 102, 'admin', '2024-11-14 11:00:00', 1),
// ( 'e2806894000040142454f06f' 'PID00443', 20, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN003', 12.0, 'Warehouse C', 'inuse', 103, 'admin', '2024-11-14 12:00:00', 1),
// ( 'aaaabbbbaaaabbbbaaaa4084', 'PID02104', 25, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN004', 7.5, 'Warehouse D', 'inuse', 104, 'admin', '2024-11-14 13:00:00', 1),
// ( 'e28068900000000079b346ae', 'PID001', 10, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN001', 5.0, 'Warehouse A', 'inuse', 10, 'admin', '2024-11-14 10:00:00', 1),
// ( 'e200001934070173232098ce', 'PID002', 15, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN002', 8.5, 'Warehouse B', 'inuse', 102, 'admin', '2024-11-14 11:00:00', 2),
// ( 'e200001a930801721390936a', 'PID003', 20, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN003', 12.0, 'Warehouse C', 'inuse', 103, 'admin', '2024-11-14 12:00:00', 3),
// ( 'e2000019340701852320a16c', 'PID004', 25, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN004', 7.5, 'Warehouse D', 'inuse', 104, 'admin', '2024-11-14 13:00:00', 4),
// ( 'e280116060000208ea4dd156', 'PID005', 30, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN005', 9.0, 'Warehouse E', 'inuse', 105, 'admin', '2024-11-14 14:00:00', 5),
// ( 'e20000193407016623208933', 'PID006', 35, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN006', 10.0, 'Warehouse F', 'inuse', 106, 'admin', '2024-11-14 15:00:00', 6),
// ( 'e280116060000208e91d209a', 'PID007', 40, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN007', 11.0, 'Warehouse G', 'inuse', 107, 'admin', '2024-11-14 16:00:00', 7),
// ( 'e2806894000040142454f06a', 'PID008', 45, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN008', 6.5, 'Warehouse H', 'inuse', 108, 'admin', '2024-11-14 17:00:00', 8),
// ( 'e200001a9308017113909755', 'PID009', 50, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN009', 13.5, 'Warehouse I', 'inuse', 109, 'admin', '2024-11-14 18:00:00', 9),
// ( 'e2000019340701862320a349', 'PID010', 55, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN010', 14.0, 'Warehouse J', 'inuse', 110, 'admin', '2024-11-14 19:00:00', 10),
// ( 'e20000193407013723206d10', 'PID011', 60, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN011', 15.0, 'Warehouse K', 'inuse', 11, 'admin', '2024-11-14 20:00:00', 11),
// ( 'e2806894000040142454f06c', 'PID012', 65, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN012', 16.0, 'Warehouse L', 'inuse', 112, 'admin', '2024-11-14 21:00:00', 12),
// ( 'e2806894000050142454f073', 'PID013', 70, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN013', 17.5, 'Warehouse M', 'inuse', 113, 'admin', '2024-11-14 22:00:00', 13),
// ( 'e200001a930801761390936c', 'PID014', 75, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN014', 18.0, 'Warehouse N', 'inuse', 114, 'admin', '2024-11-14 23:00:00', 14),
// ( 'e2806894000050142454f06e', 'PID015', 80, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN015', 19.0, 'Warehouse O', 'inuse', 115, 'admin', '2024-11-15 00:00:00', 15),
// ( 'e2806894000050142454f06b', 'PID016', 85, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN016', 20.0, 'Warehouse P', 'inuse', 116, 'admin', '2024-11-15 01:00:00', 16),
// ( 'e2806894000040142454f072', 'PID017', 90, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN017', 21.5, 'Warehouse Q', 'inuse', 117, 'admin', '2024-11-15 02:00:00', 17),
// ( 'e2806894000040142454f071', 'PID018', 95, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN018', 22.0, 'Warehouse R', 'inuse', 118, 'admin', '2024-11-15 03:00:00', 18),
// ( 'e200001a930801741390936b', 'PID019', 100, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN019', 23.0, 'Warehouse S', 'inuse', 119, 'admin', '2024-11-15 04:00:00', 19),
// ( 'e200001a9308016713908e9f', 'PID020', 105, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN020', 24.0, 'Warehouse T', 'inuse', 120, 'admin', '2024-11-15 05:00:00', 20),
// ( 'e2806894000050142454f06d', 'PID021', 110, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN021', 25.0, 'Warehouse U', 'inuse', 12, 'admin', '2024-11-15 06:00:00', 21),
// ( 'e200001a9308017013909369', 'PID022', 115, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN022', 26.0, 'Warehouse V', 'inuse', 122, 'admin', '2024-11-15 07:00:00', 22),
// ( 'e200001a9308017513909757', 'PID023', 120, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN023', 27.5, 'Warehouse W', 'inuse', 123, 'admin', '2024-11-15 08:00:00', 23),
// ( 'e2806894000050142454f070', 'PID024', 125, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN024', 28.0, 'Warehouse X', 'inuse', 124, 'admin', '2024-11-15 09:00:00', 24),
// ( 'e200001a9308016813908aac', 'PID025', 130, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN025', 29.0, 'Warehouse Y', 'inuse', 125, 'admin', '2024-11-15 10:00:00', 25),
// ( 'e200001a9308016913908ea0', 'PID026', 135, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN026', 30.0, 'Warehouse Z', 'inuse', 126, 'admin', '2024-11-15 11:00:00', 26),
// ( 'e200001934070174232091f3', 'PID027', 140, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN027', 31.0, 'Warehouse AA', 'inuse', 127, 'admin', '2024-11-15 12:00:00', 27),
// ( 'e20034123407016523209002', 'PID028', 145, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN028', 32.5, 'Warehouse AB', 'inuse', 128, 'admin', '2024-11-15 13:00:00', 28),
// ( 'e200001a9308017313909756', 'PID029', 150, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN029', 33.0, 'Warehouse AC', 'inuse', 129, 'admin', '2024-11-15 14:00:00', 29),
// ( 'e20000193407018423209ab0', 'PID030', 155, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN030', 34.0, 'Warehouse AD', 'inuse', 130, 'admin', '2024-11-15 15:00:00', 30),
// ( 'e28011606000020943ed4bd7', 'PID031', 160, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN031', 35.0, 'Warehouse AE', 'inuse', 13, 'admin', '2024-11-15 16:00:00', 31),
// ( 'e28068900000000079b29214', 'PID032', 165, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN032', 36.0, 'Warehouse AF', 'inuse', 132, 'admin', '2024-11-15 17:00:00', 32),
// ( 'e28068940000400cf725d86e', 'PID033', 170, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN033', 37.5, 'Warehouse AG', 'inuse', 133, 'admin', '2024-11-15 18:00:00', 33),
// ( 'e28068100000003900728705', 'PID034', 175, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN034', 38.0, 'Warehouse AH', 'inuse', 134, 'admin', '2024-11-15 19:00:00', 34),
// ( '300833b2ddd9014000000000', 'PID035', 180, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN035', 39.0, 'Warehouse AI', 'inuse', 135, 'admin', '2024-11-15 20:00:00', 35),
// ( 'e280116060000208ea4dd166', 'PID036', 185, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN036', 40.0, 'Warehouse AJ', 'inuse', 136, 'admin', '2024-11-15 21:00:00', 36),
// ( 'e280681000000039007286fb', 'PID037', 190, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN037', 41.5, 'Warehouse AK', 'inuse', 137, 'admin', '2024-11-15 22:00:00', 37),
// ( 'aaaabbbbaaaabbbbaaaa4085', 'PID038', 195, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN038', 42.0, 'Warehouse AL', 'inuse', 138, 'admin', '2024-11-15 23:00:00', 38),
// ( 'e28068940000500cf725d06e', 'PID039', 200, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN039', 43.0, 'Warehouse AM', 'inuse', 139, 'admin', '2024-11-16 00:00:00', 39),
// ( 'e28068900000000079b29204', 'PID040', 205, 'PKH', 'SPP JAKARTA', 'SPP SURABAYA', 'SN040', 44.0, 'Warehouse AN', 'inuse', 140, 'admin', '2024-11-16 01:00:00', 40);
