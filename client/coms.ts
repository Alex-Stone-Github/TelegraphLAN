export default class Communication {
    private static socket: WebSocket;
    private static uid: number;
    public static most_recent_data: any = [];
    public static bind(host: string) {
        this.socket = new WebSocket(host);
        this.uid = Math.random();
        this.socket.addEventListener("message", (e) => this.recv(e.data));
    }
    public static send(data: string) {
        this.socket.send(data);
    }
    private static recv(data: string) {
        this.most_recent_data = JSON.parse(data);
    }
}
