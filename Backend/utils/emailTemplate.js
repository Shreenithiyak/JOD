const getBookingEmailTemplate = (data) => {
  const { 
    userName, 
    paymentId, 
    paymentDate, 
    amount, 
    paymentMethod, 
    ticketType, 
    entryKey,
    workshopsCount
  } = data;

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f3f4f6; margin: 0; padding: 20px; color: #374151; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
      .header { background: #6366f1; padding: 30px; text-align: center; color: white; }
      .header h1 { margin: 0; font-size: 24px; font-weight: 800; }
      .content { padding: 30px; }
      .greeting { font-size: 18px; font-weight: 600; margin-bottom: 15px; color: #111827; }
      
      .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 25px; }
      .card-title { font-size: 14px; font-weight: 700; text-transform: uppercase; color: #64748b; margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; }
      
      .row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; }
      .label { color: #64748b; font-weight: 500; }
      .value { color: #0f172a; font-weight: 600; text-align: right; }
      
      .ticket { background: linear-gradient(135deg, #1e1b4b, #4338ca); color: white; border-radius: 16px; padding: 25px; margin-bottom: 25px; position: relative; overflow: hidden; }
      .ticket-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px dashed rgba(255,255,255,0.2); padding-bottom: 15px; }
      .ticket-title { font-size: 20px; font-weight: 800; margin: 0; }
      .ticket-date { font-size: 14px; opacity: 0.9; }
      
      .ticket-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
      .ticket-item { display: flex; flex-direction: column; }
      .ticket-label { font-size: 11px; text-transform: uppercase; opacity: 0.7; font-weight: 600; margin-bottom: 4px; }
      .ticket-value { font-size: 14px; font-weight: 700; }
      
      .entry-key-box { background: rgba(255,255,255,0.1); border: 2px dashed rgba(255,255,255,0.4); border-radius: 12px; padding: 20px; text-align: center; margin-top: 10px; }
      .entry-key-label { font-size: 12px; text-transform: uppercase; opacity: 0.8; font-weight: 600; margin-bottom: 10px; }
      .entry-key { font-size: 32px; font-weight: 900; letter-spacing: 4px; font-family: monospace; color: #fbbf24; margin: 0; }
      
      .qr-placeholder { background: white; padding: 10px; border-radius: 8px; width: 80px; height: 80px; display: inline-flex; align-items: center; justify-content: center; position: absolute; top: 25px; right: 25px; }
      
      .instructions { font-size: 14px; color: #475569; }
      .instructions ul { padding-left: 20px; margin-bottom: 0; }
      .instructions li { margin-bottom: 8px; }
      
      .actions { text-align: center; margin-top: 30px; display: flex; flex-direction: column; gap: 10px; }
      .btn-primary { display: inline-block; background: #6366f1; color: white; text-decoration: none; padding: 14px 24px; border-radius: 8px; font-weight: 700; font-size: 14px; transition: background 0.2s; }
      .btn-secondary { display: inline-block; background: white; color: #6366f1; text-decoration: none; padding: 14px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; border: 1px solid #6366f1; }
      
      .footer { background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 13px; }
      .socials { margin: 15px 0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Booking Confirmed ✅</h1>
        <p style="margin-top: 5px; opacity: 0.9;">SkillSwap Festival</p>
      </div>
      
      <div class="content">
        <div class="greeting">Hello ${userName},</div>
        <p style="line-height: 1.6; margin-bottom: 25px;">
          Thank you for booking your spot! Your payment has been successfully received, and your entry pass is now confirmed.
        </p>
        
        <div class="card">
          <h3 class="card-title">Payment Details</h3>
          <div class="row">
            <span class="label">Status:</span>
            <span class="value" style="color: #10b981;">✅ Successful</span>
          </div>
          <div class="row">
            <span class="label">Payment ID:</span>
            <span class="value">${paymentId}</span>
          </div>
          <div class="row">
            <span class="label">Date:</span>
            <span class="value">${paymentDate}</span>
          </div>
          <div class="row">
            <span class="label">Amount Paid:</span>
            <span class="value">₹${amount}</span>
          </div>
          <div class="row">
            <span class="label">Method:</span>
            <span class="value">${paymentMethod}</span>
          </div>
        </div>
        
        <div class="ticket">
          <div class="qr-placeholder">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${entryKey}" alt="QR" width="80" height="80" />
          </div>
          
          <div class="ticket-header">
            <div>
              <h2 class="ticket-title">SkillSwap Festival '24</h2>
              <div class="ticket-date">July 20-22, 2024</div>
            </div>
          </div>
          
          <div class="ticket-grid">
            <div class="ticket-item">
              <span class="ticket-label">Ticket No.</span>
              <span class="ticket-value">#TKT-${Math.floor(Math.random() * 90000) + 10000}</span>
            </div>
            <div class="ticket-item">
              <span class="ticket-label">Reporting Time</span>
              <span class="ticket-value">09:30 AM</span>
            </div>
            <div class="ticket-item">
              <span class="ticket-label">Venue</span>
              <span class="ticket-value">HITEX Exhibition Center, HYD</span>
            </div>
            <div class="ticket-item">
              <span class="ticket-label">Pass Type</span>
              <span class="ticket-value" style="color: #fbbf24;">${ticketType} Pass</span>
            </div>
          </div>
          
          <div class="entry-key-box">
            <div class="entry-key-label">Your Entry Key</div>
            <h3 class="entry-key">${entryKey}</h3>
            <p style="font-size: 11px; margin-top: 10px; margin-bottom: 0; opacity: 0.8;">Use this key at the entrance if QR scanning is unavailable.</p>
          </div>
        </div>
        
        <div class="card instructions">
          <h3 class="card-title">Important Instructions</h3>
          <ul>
            <li>Carry this digital ticket or show it on your mobile device.</li>
            <li>Bring a valid government-issued ID matching your name.</li>
            <li>Arrive at least 30 minutes before your first workshop.</li>
            <li>Your QR Code or Entry Key will be verified at the entrance.</li>
            <li>Entry is allowed only once using this ticket per day.</li>
            <li>This pass grants you access to <strong>${workshopsCount}</strong> premium workshops.</li>
          </ul>
        </div>
        
        <div class="actions">
          <a href="#" class="btn-primary">Download Ticket (PDF)</a>
          <a href="#" class="btn-secondary">View Festival Schedule</a>
        </div>
      </div>
      
      <div class="footer">
        <p style="font-weight: 600; font-size: 15px; color: #1e293b; margin-top: 0;">See you at the festival! 🚀</p>
        <p>Support: hello@skillswap.com | +91 98765 43210</p>
        <div class="socials">
          <a href="#" style="color: #64748b; margin: 0 10px; text-decoration: none;">Instagram</a> | 
          <a href="#" style="color: #64748b; margin: 0 10px; text-decoration: none;">Twitter</a>
        </div>
        <p style="margin-bottom: 0;">www.skillswapfestival.com</p>
      </div>
    </div>
  </body>
  </html>
  `;
};

module.exports = getBookingEmailTemplate;
