const nodemailer=require('nodemailer');
const clean=(value,max=4000)=>String(value??'').replace(/[<>\r\n]/g,' ').trim().slice(0,max);
const validEmail=value=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
module.exports=async(req,res)=>{
  if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({ok:false,error:'Método no permitido'})}
  try{
    const body=req.body||{};
    const nombre=clean(body.nombre,120),empresa=clean(body.empresa,160),email=clean(body.email,180),telefono=clean(body.telefono,60),mensaje=clean(body.mensaje,4000);
    if(!nombre||!empresa||!email||!telefono||!mensaje||!validEmail(email))return res.status(400).json({ok:false,error:'Revisa los datos del formulario'});
    const {SMTP_HOST,SMTP_USER,SMTP_PASS,CONTACT_EMAIL}=process.env;
    if(!SMTP_HOST||!SMTP_USER||!SMTP_PASS){console.error('Configuración SMTP incompleta');return res.status(503).json({ok:false,error:'Servicio de correo no configurado'})}
    const port=Number(process.env.SMTP_PORT||465);
    const transporter=nodemailer.createTransport({host:SMTP_HOST,port,secure:process.env.SMTP_SECURE?process.env.SMTP_SECURE==='true':port===465,auth:{user:SMTP_USER,pass:SMTP_PASS}});
    await transporter.sendMail({from:'"DataLabs" <'+SMTP_USER+'>',to:CONTACT_EMAIL||SMTP_USER,replyTo:email,subject:'Nueva consulta - DataLabs | Automatización Datos Estructurados',text:'Nombre: '+nombre+'\nEmpresa: '+empresa+'\nEmail: '+email+'\nTeléfono: '+telefono+'\n\nConsulta:\n'+mensaje});
    return res.status(200).json({ok:true});
  }catch(error){console.error('Error al enviar correo DataLabs:',error);return res.status(500).json({ok:false,error:'No se pudo enviar la consulta'})}
};
