import { adminDetails, SellerDetails, viewDetails } from "./shopCircuit/Axios";
import { formatDistanceToNow, format } from 'date-fns';


//------------------- Button Style ----------------------------//
// export const btnAccept = 'py-2 px-4 rounded-md uppercase text-sm bg-blue-600 hover:bg-blue-800'
// export const btnNormal = 'py-2 px-4 rounded-md uppercase text-sm bg-blue-600 hover:bg-blue-800'
// export const btnReject = 'py-2 px-4 rounded-md hover:underline font-bold text-sm text-red-600'
// export const btnViewDetails = 'text-sm rounded-md text-blue-600 hover:underline font-bold text-center py-2 px-4'
// export const btnView = 'text-sm rounded-md text-blue-600 hover:underline font-bold text-center py-2 px-4';
// export const btnDelete = 'py-2 px-4 rounded-md hover:underline font-bold uppercase text-sm text-red-600'
// export const btnDeleteForAdmin = 'py-2 rounded-md hover:underline font-bold uppercase text-sm text-red-600'
// export const btnOrder = 'w-full rounded-md text-center py-2 bg-blue-600 hover:bg-blue-800 px-4'


export const restartApp = () => {
    window.location.reload();
};


export const loggedPersonDetails = async () => {
    try {
        const loggedPerson = await SellerDetails();
        const loggedPersonAdmin = await adminDetails();
        return {
            loggedPerson,
            loggedPersonAdmin
        }
    } catch (error) {
        console.log(error)
    }
}

export const checkAdmin = async () => {
    try {
        const loggedPersonAdmin = await adminDetails();
        if (loggedPersonAdmin.data === 'invalid Access' || loggedPersonAdmin.data === 'Invalid admin' || loggedPersonAdmin.data === 'You must logged in first') {
            return false;
        } else if (loggedPersonAdmin.data.role === 'admin') {
            return true;
        }
        return true
    } catch (error) {
        console.log(error)
    }
}

export const checkSeller = async () => {
    try {
        const loggedPersonSeller = await SellerDetails();
        if (loggedPersonSeller.data === 'invalid Access' || loggedPersonSeller.data === 'Invalid seller' || loggedPersonSeller.data === 'You must logged in first') {
            return false;
        } else if (loggedPersonSeller.data.role === 'seller') {
            return true;
        }
    } catch (error) {
        console.log(error)
    }
}

export const dateFormatter = (currentDate) => {
    const newDate = new Date(currentDate);
    const now = new Date();
    const distance = formatDistanceToNow(newDate, { addSuffix: true });

    const shortDistance = distance
      .replace('about', '')
      .replace('minutes', 'min')
      .replace('minute', 'min')
      .replace('hours', 'hr')
      .replace('hour', 'hr')
      .replace('days', 'd')
      .replace('day', 'd')
      .replace('seconds', 'sec')
      .replace('second', 'sec');

    if (newDate > new Date(now - 24 * 60 * 60 * 1000)) {
      return shortDistance;
    } else {
      return format(newDate, 'MMM dd, yyyy');
      
    }
}

export const timeFormatter = (currentTime) => {
    const time = new Date(currentTime)
    const options = {
        timeZone: 'Asia/Kathmandu',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(time)
}

