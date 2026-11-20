// Vercel serverless function. Emails the owner via Resend.
// Env vars: RESEND_API_KEY, OWNER_EMAIL, FROM_EMAIL (e.g. "Emstene Website <onboarding@resend.dev>")
const clean=(v,max)=>String(v||"").replace(/[\r\n]+/g," ").trim().slice(0,max);
module.exports=async(req,res)=>{
  if(req.method!=="POST")return res.status(405).json({error:"Method not allowed"});
  const b=typeof req.body==="string"?JSON.parse(req.body||"{}"):(req.body||{});
  if(b.website)return res.status(200).json({ok:true}); // honeypot: bots fill this
  const name=clean(b.name,80),phone=clean(b.phone,25),occasion=clean(b.occasion,60),date=clean(b.date,30);
  const message=String(b.message||"").trim().slice(0,1500);
  if(!name||!/^[+0-9 ()-]{9,20}$/.test(phone))return res.status(400).json({error:"Name and a valid phone number are required"});
  const {RESEND_API_KEY,OWNER_EMAIL,FROM_EMAIL}=process.env;
  if(!RESEND_API_KEY||!OWNER_EMAIL)return res.status(503).json({error:"Email is not configured"});
  const text=`Name: ${name}\nPhone: ${phone}\nOccasion: ${occasion}\nDate needed: ${date||"-"}\n\n${message}`;
  const r=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${RESEND_API_KEY}`,"Content-Type":"application/json"},
    body:JSON.stringify({from:FROM_EMAIL||"Emstene Website <onboarding@resend.dev>",to:[OWNER_EMAIL],subject:`New order enquiry from ${name}`,text})});
  return r.ok?res.status(200).json({ok:true}):res.status(502).json({error:"Could not send"});
};
