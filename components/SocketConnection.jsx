import { toast } from 'react-toastify';
import axios from 'axios';

export const SocketConnection = async () => {
    const response = await axios.get('http://localhost:8000/accounts/user/', { withCredentials: true }, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })

    const { id } = response.data.user
    const socket = new WebSocket(`ws://localhost:8000/ws/notifications/${id}/`);

    socket.onopen = () => {
        console.log('websocket connected')
        if (socket.current && socket.current.readyState === WebSocket.OPEN) {
            socket.current.send(JSON.stringify({ 'message': 'Connection established with React notebook-frontend app.' }))
        }
    }

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data)
        if (data['type'] != 'undefined' && data['type'] == 'created_category_error') {
            toast.error(data['notification'], { position: 'bottom-left' })
        } else if (data['type'] != 'undefined' && data['type'] == 'notification_created_category') {
            toast.success(data['notification'], { position: 'bottom-left' })
        } else if (data['type'] != 'undefined' && data['type'] == 'notification_deleted_category') {
            toast.success(data['notification'], { position: 'bottom-left' })
        } else if (data['type'] != 'undefined' && data['type'] == 'notification_created_note') {
            toast.success(data['notification'], { position: 'bottom-left' })
        } else if (data['type'] != 'undefined' && data['type'] == 'created_note_error') {
            toast.error(data['notification'], { position: 'bottom-left' })
        } else if (data['type'] != 'undefined' && data['type'] == 'notification_deleted_note') {
            toast.success(data['notification'], { position: 'bottom-left' })
        }
    };

    socket.onclose = () => {
        console.log('WebSocket disconnected');
    };

    return () => {
        socket.close();
    };

}
