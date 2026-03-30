import react, { usestate } from 'react';

interface bookingmodalprops {
  open: boolean;
  onclose: () => void;
  onsubmit: (data: any) => void;
}

const bookingmodal: react.fc<bookingmodalprops> = ({ open, onclose, onsubmit }) => {
  const [form, setform] = usestate({
    name: '',
    email: '',
    phone: '',
    date: '',
    experience: '',
    message: '',
  });

  if (!open) return null;

  const handlechange = (e: react.changeevent<htmlinputelement | htmltextareaelement>) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handlesubmit = (e: react.formevent) => {
    e.preventdefault();
    onsubmit(form);
    onclose();
  };

  return (
    <div classname="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div classname="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 classname="text-xl font-bold mb-4">new booking</h2>
        <form onsubmit={handlesubmit} classname="space-y-3">
          <input name="name" value={form.name} onchange={handlechange} placeholder="name" classname="w-full border p-2 rounded" required />
          <input name="email" value={form.email} onchange={handlechange} placeholder="email" classname="w-full border p-2 rounded" required />
          <input name="phone" value={form.phone} onchange={handlechange} placeholder="phone" classname="w-full border p-2 rounded" />
          <input name="date" value={form.date} onchange={handlechange} placeholder="preferred date" classname="w-full border p-2 rounded" type="date" />
          <input name="experience" value={form.experience} onchange={handlechange} placeholder="experience level" classname="w-full border p-2 rounded" />
          <textarea name="message" value={form.message} onchange={handlechange} placeholder="message" classname="w-full border p-2 rounded" />
          <div classname="flex justify-end gap-2 mt-4">
            <button type="button" onclick={onclose} classname="px-4 py-2 bg-gray-200 rounded">cancel</button>
            <button type="submit" classname="px-4 py-2 bg-blue-600 text-white rounded">submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default bookingmodal;
