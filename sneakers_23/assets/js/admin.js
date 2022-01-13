import { Presence } from 'phoenix'
import '../css/admin.css'
import "../css/app.css"
import './admin/dom'
import { adminSocket } from "./admin/socket"

adminSocket.connect()

const cartTracker = adminSocket.channel("admin:cart_tracker")
const presence = new Presence(cartTracker)
window.presence = presence // This is a helper for us

cartTracker.join().receive("error", () => {
  console.error("Channel join failed")
})