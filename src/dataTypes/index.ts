export interface LoadingData {
    id: number;
    BagID: string;
    Bag_Weight: string;
    loadEndTime: string;
    loadStartTime: string;
    loadedBy: string;
    loader_contact: string;
    manifestId: number;
    status: string;
    total: number;
    vehicle: string;
  }

  export interface RfidTag {
    TID: string;
    EPC: string;
    item_name: string;
    quantity: number;
    item_description: string;
    last_location_name: string;
    last_location_address: string;
    updated_by: string;
    updated_by_contact: string;
  }

  export interface RfidTag {
    TID: string;
    EPC: string;
    item_name: string;
    quantity: number;
    item_description: string;
    last_location_name: string;
    last_location_address: string;
    updated_by: string;
    updated_by_contact: string;
  }
  

  export interface RfidTag {
    TID: string;
    EPC: string;
    item_name: string;
    quantity: number;
    item_description: string;
    last_location_name: string;
    last_location_address: string;
    updated_by: string;
    updated_by_contact: string;
  }
  

  export interface receiving {
    BagID: string;
  bag_weight: string;
  total: number;
  receiver_name: string;
  receiver_contact: string;
  destination: string;
  status: string;
  scanned_at: string;
  id: number;
  }