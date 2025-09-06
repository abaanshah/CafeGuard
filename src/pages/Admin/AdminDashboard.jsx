// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import logo from '../../assets/cafeguardLogo.png';
// import { Camera } from 'lucide-react';
// import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

// // --- Icon Components ---
// const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.283.356-1.857m0 0a3.002 3.002 0 013.42-2.434M12 10a3 3 0 11-6 0 3 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
// const QrIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h-1m-1 6v-1M4 12H3m16 0h1M7 4h1M4 7v1m1-1v1m0 10v1m12-1V7M9 9h6v6H9V9z" /></svg>;
// const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;

// const AdminDashboard = () => {
//   const navigate = useNavigate();

//   // --- MOCK DATA ---
//   const [stats] = useState({ activeUsers: 4, totalLoginsToday: 45 });
//   const [activeCustomers] = useState([
//     { id: '1', phone: '...1234', entryTime: '3:45 PM', timeLeft: '15m' },
//     { id: '2', phone: '...5678', entryTime: '4:02 PM', timeLeft: '32m' },
//     { id: '3', phone: '...9012', entryTime: '4:15 PM', timeLeft: '45m' },
//     { id: '4', phone: '...3456', entryTime: '4:20 PM', timeLeft: '50m' },
//   ]);

//   // --- Scanner State ---
//   const [isScannerActive, setIsScannerActive] = useState(false);
//   const [scanResult, setScanResult] = useState('');
//   const [scannerError, setScannerError] = useState('');
//   const [decrypted, setDecrypted] = useState('');

//   const videoRef = useRef(null);
//   const codeReaderRef = useRef(null);
//   const controlsRef = useRef(null);

//   // --- Helper: Check if Base64 ---
//   const isBase64 = (str) => {
//     try {
//       return btoa(atob(str)) === str;
//     } catch {
//       return false;
//     }
//   };

//   // --- Scanner Logic ---
//   const startScanner = async () => {
//     setScanResult('');
//     setScannerError('');
//     setDecrypted('');
//     setIsScannerActive(true);

//     try {
//       codeReaderRef.current = new BrowserMultiFormatReader();
//       const devices = await codeReaderRef.current.listVideoInputDevices();
//       if (devices.length === 0) throw new Error("No camera found.");

//       const rearCamera =
//         devices.find((d) => d.label.toLowerCase().includes("back"))?.deviceId ||
//         devices[0].deviceId;

//       controlsRef.current = await codeReaderRef.current.decodeFromVideoDevice(
//         rearCamera,
//         videoRef.current,
//         async (result, err, controls) => {
//           if (result) {
//             const raw = result.getText();
//             setScanResult(raw);

//             if (isBase64(raw)) {
//               setDecrypted(atob(raw));
//             } else {
//               setDecrypted(raw); // fallback: plain text QR
//             }
//           }
//           if (err && !(err instanceof NotFoundException)) {
//             setScannerError("Scan failed. Please try again.");
//           }
//         }
//       );
//     } catch (err) {
//       setScannerError("Camera initialization failed: " + err.message);
//     }
//   };

//   const stopScanner = () => {
//     if (controlsRef.current) controlsRef.current.stop();
//     setIsScannerActive(false);
//   };

//   useEffect(() => {
//     return () => {
//       if (controlsRef.current) controlsRef.current.stop();
//     };
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('adminToken');
//     navigate('/admin');
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 font-sans">
//       {/* --- Left Floating Sidebar --- */}
//       <aside className="w-100 bg-white shadow-lg flex flex-col shrink-0">
//         <div className="p-6">
//           <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Analytics</h2>
//           <div className="mt-4 grid grid-cols-2 gap-4">
//             <div className="bg-gradient-to-br from-[#1F4D34] to-[#284838] p-4 rounded-xl text-white">
//               <p className="text-4xl font-bold">{stats.activeUsers}</p>
//               <p className="text-sm">Active Users</p>
//             </div>
//             <div className="bg-gradient-to-br from-[#9A5832] to-[#A45A2A] p-4 rounded-xl text-white">
//               <p className="text-4xl font-bold">{stats.totalLoginsToday}</p>
//               <p className="text-sm">Logins Today</p>
//             </div>
//           </div>
//         </div>

//         <div className="flex-grow p-6 overflow-y-auto">
//           <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Live Connections</h2>
//           <table className="w-full mt-4 text-left text-sm">
//             <thead>
//               <tr className="text-gray-600">
//                 <th className="py-2 font-semibold">Phone</th>
//                 <th className="py-2 font-semibold">Time Left</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y">
//               {activeCustomers.map((customer) => (
//                 <tr key={customer.id}>
//                   <td className="py-3">{customer.phone}</td>
//                   <td className="py-3 font-semibold text-[#1F4D34]">{customer.timeLeft}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="p-6 border-t-2 border-gray-200">
//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center justify-center space-x-2 py-3 px-4 font-semibold text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
//           >
//             <LogoutIcon />
//             <span>Logout</span>
//           </button>
//         </div>
//       </aside>

//       {/* --- Right Main Panel (Scanner) --- */}
//       <main className="flex-1 flex items-center justify-center p-8 bg-gray-200">
//         <div className="w-full h-full mt-[-100px] max-w-4xl max-h-[650px] bg-white rounded-2xl shadow-xl flex flex-col justify-center transition-all duration-300">
//           {!isScannerActive ? (
//             <div className="text-center p-8 animate-fadeIn">
//               <Camera className="h-24 w-24 mx-auto text-gray-300" />
//               <h2 className="mt-6 text-3xl font-bold text-gray-800">Verify Customer Access</h2>
//               <p className="mt-2 text-gray-500">Click the button below to activate the camera and scan a customer's QR code.</p>
//               <button
//                 onClick={startScanner}
//                 className="mt-8 inline-flex items-center space-x-3 px-8 py-4 bg-[#9A5832] text-white text-xl font-bold rounded-full shadow-lg transform hover:scale-105 transition-transform"
//               >
//                 <span>Start Scanner</span>
//               </button>
//             </div>
//           ) : (
//             <div className="w-full h-full p-8 flex flex-col animate-fadeIn">
//               {/* Smaller Camera */}
//               <video
//                 ref={videoRef}
//                 className="w-[280px] h-[220px] mx-auto bg-gray-900 rounded-lg object-cover border-2 border-gray-600"
//               ></video>

//               <div className="mt-4 text-center">
//                 {scannerError && <p className="text-red-500 font-semibold">{scannerError}</p>}
//                 {scanResult && (
//                   <div className="p-4 mt-2 rounded-lg border bg-green-100 border-green-300">
//                     <p className="font-bold text-green-800">Scanned QR Code</p>
//                     <p className="text-sm text-gray-700 mt-1 break-all">{scanResult}</p>
//                   </div>
//                 )}
//                 {decrypted && (
//                   <div className="p-4 mt-2 rounded-lg border bg-blue-100 border-blue-300">
//                     <p className="font-bold text-blue-800">Decrypted Password</p>
//                     <p className="text-sm text-gray-700 mt-1">{(decrypted)}</p>
//                   </div>
//                 )}
//               </div>

//               <button
//                 onClick={stopScanner}
//                 className="mt-4 w-full py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
//               >
//                 Close Scanner
//               </button>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/cafeguardLogo.png';
import { Camera } from 'lucide-react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

// --- Icon Components ---
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.283.356-1.857m0 0a3.002 3.002 0 013.42-2.434M12 10a3 3 0 11-6 0 3 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const QrIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h-1m-1 6v-1M4 12H3m16 0h1M7 4h1M4 7v1m1-1v1m0 10v1m12-1V7M9 9h6v6H9V9z" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;

// --- AES Decryption Utils ---
const password = "mySecretPassword123";

async function deriveKey(password) {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", keyData);

  return await crypto.subtle.importKey(
    "raw",
    hash,
    { name: "AES-CBC" },
    false,
    ["decrypt"]
  );
}

// Decrypt AES-CBC encrypted data (IV is first 16 bytes)
async function decryptAES(encryptedB64, password) {
  try {
    const encryptedBytes = Uint8Array.from(atob(encryptedB64), c => c.charCodeAt(0));
    const iv = encryptedBytes.slice(0, 16);
    const ciphertext = encryptedBytes.slice(16);

    const key = await deriveKey(password);

    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: "AES-CBC", iv: iv },
      key,
      ciphertext
    );

    const decoder = new TextDecoder();
    return decoder.decode(decryptedBuffer);
  } catch (err) {
    return "❌ Failed to decrypt message";
  }
}

const AdminDashboard = () => {
  const navigate = useNavigate();

  // --- MOCK DATA ---
  const [stats] = useState({ activeUsers: 4, totalLoginsToday: 45 });
  const [activeCustomers] = useState([
    { id: '1', phone: '...1234', entryTime: '3:45 PM', timeLeft: '15m' },
    { id: '2', phone: '...5678', entryTime: '4:02 PM', timeLeft: '32m' },
    { id: '3', phone: '...9012', entryTime: '4:15 PM', timeLeft: '45m' },
    { id: '4', phone: '...3456', entryTime: '4:20 PM', timeLeft: '50m' },
  ]);

  // --- Scanner State ---
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [scanResult, setScanResult] = useState('');
  const [scannerError, setScannerError] = useState('');
  const [decrypted, setDecrypted] = useState('');

  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);
  const controlsRef = useRef(null);

  // --- Scanner Logic ---
  const startScanner = async () => {
    setScanResult('');
    setScannerError('');
    setDecrypted('');
    setIsScannerActive(true);

    try {
      codeReaderRef.current = new BrowserMultiFormatReader();
      const devices = await codeReaderRef.current.listVideoInputDevices();
      if (devices.length === 0) throw new Error("No camera found.");

      const rearCamera =
        devices.find((d) => d.label.toLowerCase().includes("back"))?.deviceId ||
        devices[0].deviceId;

      controlsRef.current = await codeReaderRef.current.decodeFromVideoDevice(
        rearCamera,
        videoRef.current,
        async (result, err, controls) => {
          if (result) {
            const raw = result.getText();
            setScanResult(raw);

            // Attempt AES decryption
            const plain = await decryptAES(raw, password);
            setDecrypted(plain);
          }
          if (err && !(err instanceof NotFoundException)) {
            setScannerError("Scan failed. Please try again.");
          }
        }
      );
    } catch (err) {
      setScannerError("Camera initialization failed: " + err.message);
    }
  };

  const stopScanner = () => {
    if (controlsRef.current) controlsRef.current.stop();
    setIsScannerActive(false);
  };

  useEffect(() => {
    return () => {
      if (controlsRef.current) controlsRef.current.stop();
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* --- Left Floating Sidebar --- */}
      <aside className="w-100 bg-white shadow-lg flex flex-col shrink-0">
        <div className="p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Analytics</h2>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-[#1F4D34] to-[#284838] p-4 rounded-xl text-white">
              <p className="text-4xl font-bold">{stats.activeUsers}</p>
              <p className="text-sm">Active Users</p>
            </div>
            <div className="bg-gradient-to-br from-[#9A5832] to-[#A45A2A] p-4 rounded-xl text-white">
              <p className="text-4xl font-bold">{stats.totalLoginsToday}</p>
              <p className="text-sm">Logins Today</p>
            </div>
          </div>
        </div>

        <div className="flex-grow p-6 overflow-y-auto">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Live Connections</h2>
          <table className="w-full mt-4 text-left text-sm">
            <thead>
              <tr className="text-gray-600">
                <th className="py-2 font-semibold">Phone</th>
                <th className="py-2 font-semibold">Time Left</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {activeCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td className="py-3">{customer.phone}</td>
                  <td className="py-3 font-semibold text-[#1F4D34]">{customer.timeLeft}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t-2 border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 font-semibold text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* --- Right Main Panel (Scanner) --- */}
      <main className="flex-1 flex items-center justify-center p-8 bg-gray-200">
        <div className="w-full h-full mt-[-100px] max-w-4xl max-h-[650px] bg-white rounded-2xl shadow-xl flex flex-col justify-center transition-all duration-300">
          {!isScannerActive ? (
            <div className="text-center p-8 animate-fadeIn">
              <Camera className="h-24 w-24 mx-auto text-gray-300" />
              <h2 className="mt-6 text-3xl font-bold text-gray-800">Verify Customer Access</h2>
              <p className="mt-2 text-gray-500">Click the button below to activate the camera and scan a customer's QR code.</p>
              <button
                onClick={startScanner}
                className="mt-8 inline-flex items-center space-x-3 px-8 py-4 bg-[#9A5832] text-white text-xl font-bold rounded-full shadow-lg transform hover:scale-105 transition-transform"
              >
                <span>Start Scanner</span>
              </button>
            </div>
          ) : (
            <div className="w-full h-full p-8 flex flex-col animate-fadeIn">
              {/* Camera Preview */}
              <video
                ref={videoRef}
                className="w-[280px] h-[220px] mx-auto bg-gray-900 rounded-lg object-cover border-2 border-gray-600"
              ></video>

              <div className="mt-4 text-center">
                {scannerError && <p className="text-red-500 font-semibold">{scannerError}</p>}
                {scanResult && (
                  <div className="p-4 mt-2 rounded-lg border bg-green-100 border-green-300">
                    <p className="font-bold text-green-800">Scanned QR Code</p>
                    <p className="text-sm text-gray-700 mt-1 break-all">{scanResult}</p>
                  </div>
                )}
                {decrypted && (
                  <div className="p-4 mt-2 rounded-lg border bg-blue-100 border-blue-300">
                    <p className="font-bold text-blue-800">Decrypted Message</p>
                    <p className="text-sm text-gray-700 mt-1 break-all">{decrypted}</p>
                  </div>
                )}
              </div>

              <button
                onClick={stopScanner}
                className="mt-4 w-full py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close Scanner
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
