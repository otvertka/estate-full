// types for data from dummy data 
export type ListItemProps = {
        id: number;
        title: string;
        images: string[];
        bedroom: number;
        bathroom: number;
        price: number;
        address: string;
        latitude: number;
        longitude: number;
        isSaved: boolean,
        // onDelete: string,

}
export type SingleItemProps = {
        id: number;
        title: string;
        images: string[];
        bedRooms: number;
        bathroom: number;
        price: number;
        address: string;
        latitude: number;
        longitude: number;
        size: 861,  
        city: string,
        school: string,
        bus: string,
        restaurant: string,
        description:string,
}
