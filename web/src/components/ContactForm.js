import React, { useState, useEffect } from "react";
import PortableText from "./portableText"
import { useDropzone } from 'react-dropzone'
import Toast from 'light-toast';

const typeSelection = ['Visit Showroom', 'Request for Callback']
const serviceSelection = ['General Enquiries', 'Sales - Curtains', 'Sales - Window Blinds']
const timeslotSelection = ['09:00am', '10:00am', '11:00am', '12:00pm', '01:00pm', '02:00pm', '03:00pm', '04:00pm', '05:00pm', '06:00pm', ]

const FileIcon = () => (
  <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" width="1em" height="1em">
    <path d="M10.5 4.5H18.5V20.5H6.5V8.5L10.5 4.5Z" style={{ stroke: "currentcolor", strokeWidth: 1.2 }}></path>
    <path d="M10.5 4.5V8.5H6.5" style={{ stroke: "currentcolor", strokeWidth: 1.2 }}></path>
  </svg>
)

const ChevronDown = () => (
  <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.64645 3.64645L0.853553 0.853553C0.538571 0.538571 0.761654 0 1.20711 0H6.79289C7.23835 0 7.46143 0.53857 7.14645 0.853553L4.35355 3.64645C4.15829 3.84171 3.84171 3.84171 3.64645 3.64645Z" fill="#20215B"/>
  </svg>
)

const ResetIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-1">
    <path d="M1.41699 6.00033C1.41699 8.53163 3.46902 10.5837 6.00033 10.5837C8.53163 10.5837 10.5837 8.53163 10.5837 6.00033C10.5837 3.46902 8.53163 1.41699 6.00033 1.41699C4.73753 1.41699 3.59402 1.92768 2.76505 2.7538" stroke="#BBBBBB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M3.91699 3.08301L2.45943 3.08425L2.45943 1.62467" stroke="#BBBBBB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
)

const minDate = () => {
  const dtToday = new Date();

  let month = dtToday.getMonth() + 1;
  let day = dtToday.getDate() + 1;
  const year = dtToday.getFullYear();

  if (month < 10)
    month = '0' + month.toString();
  if (day < 10)
    day = '0' + day.toString();

  return year + '-' + month + '-' + day;
}

const ContactForm = ({ text, heading, siteData }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [type, setType] = useState(typeSelection[0])
  const [date, setDate] = useState('')
  const [timeslot, setTimeslot] = useState('09:00am')
  const [service, setService] = useState(serviceSelection[0])
  const [mobile, setMobile] = useState('+65 ')

  useEffect(() => {
    const usp = new URLSearchParams(window.location.search)
    if (usp.get('submitted') && usp.get('submitted') === 'true') {
      Toast.success("Form successfully submitted!", 5000)
    }

  }, [])
  const onDrop = acceptedFiles => {
    console.log(acceptedFiles)
    setFile(acceptedFiles[0])
  }
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false })

  const handleChange = e => {
    const { name, value } = e.target
    switch (name) {
      case 'name':
        return setName(value)
      case 'email':
        return setEmail(value)
      case 'message':
        return setMessage(value)
      case 'type':
        return setType(value)
      case 'date':
        return setDate(value)
      case 'timeslot':
        return setTimeslot(value)
      case 'service':
        return setService(value)
      case 'mobile':
        return setMobile(value)
      default:
        return null
    }
  }

  const resetForm = () => {
    if (confirm("Are you sure?")) {
      setName("")
      setEmail("")
      setMessage("")
      setType(typeSelection[0])
      setDate("")
      setTimeslot("")
      setService(serviceSelection[0])
      setMobile("+65 ")
      setFile(null)
    }
  }
  return (
    <section className="container mx-auto my-8 lg:w-5/6 text-primary w-11/12" id="appointment">
      <div className="lg:flex flex-row items-center mb-6 lg:mb-0">
        <div className="lg:w-2/3">
          {heading && <h1 className="lg:text-5xl font-bold mb-4 leading-tight text-3xl">{heading}</h1>}
          <div className="text-lg p-mb lg:mb-12 text-lg">
            <PortableText blocks={text} />
          </div>
        </div>
        <div className="lg:w-1/3 lg:text-right text-lg">
          <div className="font-bold">Showroom location</div>
          {
            siteData && 
            <>
              <PortableText blocks={siteData._rawAddress} />
              {siteData.addressLink && <a href={siteData.addressLink} target="_blank" className="text-link text-sm font-semibold">View on Google Maps</a>}
            </>
          }
        </div>
      </div>
      <form method="POST" action={`https://formsubmit.co/${siteData.emailTo}`} enctype="multipart/form-data">
        <div className="lg:flex lg:flex-row w-full">
          <div className="lg:w-5/12 relative">
            <input type="text" name="_honey" className="madu" />
            <input type="hidden" name="_next" value={`${process.env.GATSBY_BASE_URL}/visit-us?submitted=true#appointment`} />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <div className="mb-5">
              <div className="text-lg text-grey mb-2">Appointment Type</div>
              <div className="flex flex-row">
                {typeSelection.map((t, i) => (
                  <div className={`w-1/${typeSelection.length} rounded-2xl py-3 text-center font-semibold ${i === (typeSelection.length - 1) ? '' : 'mr-3 '}${type === t ? 'border-2 border-primary' : 'bg-secondary border-f6 hover:bg-bg border-2 hover:border-primary'} cursor-pointer`} onClick={() => setType(t)}>{t}</div>
                ))}
                <input type="hidden" name="type" value={type} />
              </div>
            </div>
            <div className="mb-5">
              <div className="text-lg text-grey mb-2">Select a date</div>
              <input required type="date" name="date" value={date} onChange={handleChange} min={minDate()} className="p-3 w-full bg-secondary rounded-2xl webkit-none h-12" />
            </div>
            <div className="mb-5">
              <div className="text-lg text-grey mb-2">Timeslot</div>
              <div className="flex flex-wrap">
                {timeslotSelection.map(t => (
                  <div className={`rounded-2xl p-3 mr-3 mb-3 text-center font-semibold ${timeslot === t ? 'border-2 border-primary' : 'bg-secondary border-f6 hover:bg-bg border-2 hover:border-primary'} cursor-pointer`} onClick={() => setTimeslot(t)}>{t}</div>
                ))}
                <input type="hidden" name="timeslot" value={timeslot} />
              </div>
            </div>
            <div className="mb-5">
              <div className="text-lg text-grey mb-2">What services would you like: </div>
              <div className="relative">
                <select name="service" value={service} onChange={handleChange} className="p-3 w-full bg-secondary rounded-2xl appearance-none webkit-none h-12">
                  {serviceSelection.map(s => (<option value={s}>{s}</option>))}
                </select>
                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <ChevronDown />
                </span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/6 hidden lg:block"></div>
          <div className="lg:w-5/12">
            <div className="mb-5">
              <div className="text-lg text-grey mb-2">Your Name</div>
              <input required type="text" name="name" value={name} onChange={handleChange} className="p-3 w-full bg-secondary rounded-2xl" placeholder="Enter your full name" />
            </div>
            <div className="flex flex-row">
              <div className="w-5/12">
                <div className="mb-5">
                  <div className="text-lg text-grey mb-2">Mobile number</div>
                  <input required type="text" name="mobile" value={mobile} onChange={handleChange} className="p-3 w-full bg-secondary rounded-2xl" />
                </div>
              </div>
              <div className="w-1/12" />
              <div className="w-1/2">
                <div className="mb-5">
                  <div className="text-lg text-grey mb-2">Email</div>
                  <input required type="email" name="email" value={email} onChange={handleChange} placeholder="email@domain.com" className="p-3 w-full bg-secondary rounded-2xl" />
                </div>
              </div>
            </div>
            <div className="mb-5">
              <div className="text-lg text-grey mb-2">Upload your layout/floorplan (Optional)</div>
              <div {...getRootProps()} className="border-dashed border-primary rounded-2xl text-center p-4 cursor-pointer hover:border-solid" style={{ borderWidth: 3 }}>
                <input {...getInputProps()} name="file" />
                <div className="flex flex-row items-center justify-center">{file ? <><FileIcon /> {file.name}</> : "Click to select a file for upload"}</div>
              </div>
            </div>
            <div className="mb-5">
              <div className="text-lg text-grey mb-2">Your Message (Optional)</div>
              <textarea name="message" value={message} onChange={handleChange} placeholder="You can share the type of products you are looking for, your unit type, the dimensions and other relevant info."  className="p-3 w-full bg-secondary rounded-2xl" rows={5} />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row justify-center mt-4">
          <button type="submit" className="text-sm font-semibold py-4 px-6 rounded-2xl bg-primary text-bg border border-primary hover:bg-bg hover:text-primary">Submit</button>
          <button type="button" onClick={resetForm} className="text-sm font-semibold py-4 px-6 rounded-2xl flex flex-row items-center text-grey"><ResetIcon /> Reset Form</button>
        </div>
      </form>
    </section>
  )
};

export default ContactForm;
