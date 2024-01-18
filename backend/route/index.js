const express= require('express')
const router=express()
const agentController= require('../controller/index')
const TicketController= require('../controller/moment')


//routes for Support Agent details
router.post('/api/create_agentdetails', agentController.createAgent)
router.post('/api/signin', agentController.signin)
router.get('/api/getagentList', agentController.getAgentList)
router.get('/api/getagentDetails/:id', agentController.AgentDetails)
router.put('/api/UpdateAgentDetails/:id', agentController.UpdateAgentDetails)
router.get('/api/deleteAgentDetails/:id', agentController.deleteAgentTicket)


//routes for Support Ticket details
router.post('/api/createSupportTicket', TicketController.createSupportTicket)
router.get('/api/supportTicketList', TicketController.SupportTicketList)
router.get('/api/supportTicketDetails/:id', TicketController.SupportTicketDetails)
router.put('/api/editTicketDetails/:id', TicketController.editTicketDetails)
router.get('/api/deleteAgentTicket/:id', TicketController.deleteTicket)


module.exports = router;