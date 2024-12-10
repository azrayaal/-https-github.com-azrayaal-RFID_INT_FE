// export interface LoadingData {
//     id: number;
//     BagID: string;
//     Bag_Weight: string;
//     loadEndTime: string;
//     loadStartTime: string;
//     loadedBy: string;
//     loader_contact: string;
//     manifestId: number;
//     status: string;
//     total: number;
//     vehicle: string;
//   }

  export interface RfidTag {
    BagID: string;
    PID: string;
    EPC: string;
  weight: string;
  total: number;
  sealNumber: string;
  receiver_name: string;
  receiver_contact: string;
  originLocation: string;
  destination: string;
  status: string;
  service: string;
  updated_at: string;
  created_rfid_by: string;
  currentLocation: string;
  scanned_at: string;
  created_at: string;
  id: number;
    item_name: string;
    item_description: string;
    location: {
      address: string;
      name: string;
    }
    quantity: number;
    seal_number: string;
    updated_by: {
      contact: string;
      name: string;
    }
  }
  // export interface RfidTag {
  //   id: number;
  //   EPC: string;
  //   PID: string;
  //   item_name: string;
  //   weight: string;
  //   seal_number: string;
  //   quantity: number;
  //   item_description: string;
  //   last_location_name: string;
  //   last_location_address: string;
  //   destination_name: string;
  //   destination_address: string;
  //   updated_by: string;
  //   updated_by_contact: string;
  // }

  export interface receiving {
  BagID: string;
  PID: string;
  EPC: string;
  weight: string;
  total: number;
  type: string;
  movement_created_at: string;
  tag_status: string;
  sealNumber: string;
  packagesCount: number;
  receiver_name: string;
  receiver_contact: string;
  originLocation: string;
  destination: string;
  status: string;
  service: string;
  updated_at: string;
  created_rfid_by: string;
  currentLocation: string;
  scanned_at: string;
  created_at: string;
  id: number;
  }
  export interface LoadingData {
    BagID: string;
  weight: string;
  PID: string;
  total: number;
  receiver_name: string;
  receiver_contact: string;
  destination: string;
  status: string;
  scanned_at: string;
  id: number;
  }

  export interface userData {
    name: string;
    email: string;
    id: number;
    role: string;
  }