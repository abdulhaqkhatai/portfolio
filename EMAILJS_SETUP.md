# Email.js Setup Guide

This portfolio uses Email.js to send emails directly from the contact form. Follow these steps to set it up:

## Steps to Configure Email.js

### 1. Sign up for Email.js
- Go to https://www.emailjs.com/
- Sign up for a free account
- Verify your email

### 2. Add Gmail Service
- In the Email.js dashboard, go to **Email Services**
- Click **Add Service**
- Select **Gmail**
- Follow the instructions to connect your Gmail account (abdulhaqkhatai763@gmail.com)
- Copy your **Service ID** (looks like: `service_xxxxx`)

### 3. Create Email Template
- Go to **Email Templates**
- Click **Create New Template**
- Use the following template with these variables:
  - `{{from_name}}` - Name of the person sending the message
  - `{{from_email}}` - Email of the person sending the message
  - `{{message}}` - The message content
  - `{{to_email}}` - Your email (abdulhaqkhatai763@gmail.com)

**Example Template Content:**
```
Subject: New Portfolio Inquiry from {{from_name}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

- Save and copy your **Template ID** (looks like: `template_xxxxx`)

### 4. Get Your Public Key
- Go to **Account** in the Email.js dashboard
- Copy your **Public Key**

### 5. Update App.jsx
In your `src/App.jsx` file, find these lines and replace with your actual credentials:

```javascript
emailjs.init({
  publicKey: 'YOUR_PUBLIC_KEY_HERE'  // Replace with your public key
});
```

And in the contactForm event listener, update:
```javascript
const response = await emailjs.send(
  'YOUR_SERVICE_ID_HERE',      // Replace with your Service ID
  'YOUR_TEMPLATE_ID_HERE',     // Replace with your Template ID
  {
    from_name: name,
    from_email: email,
    message: message,
    to_email: 'abdulhaqkhatai763@gmail.com'
  }
);
```

### 6. Test
- Run development server: `npm run dev`
- Go to your portfolio's contact form
- Send a test message
- Check if you receive the email at abdulhaqkhatai763@gmail.com

## Important Notes
- Keep your Public Key safe (it's public, so it's okay to expose in frontend code)
- Never expose your Secret Key
- Email.js free plan includes 200 free emails per month
- The contact form will work on deployed live websites too!

## Troubleshooting
- If emails aren't sending, check browser console for error messages
- Make sure your Email.js account is activated
- Verify that Gmail service is properly connected
- Check that Template IDs and Service IDs are correct
