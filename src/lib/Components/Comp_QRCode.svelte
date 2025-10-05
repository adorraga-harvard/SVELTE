<script>
  import { onMount } from 'svelte';

  let nationalIdToGenerate = '';
  let generatedQrCodeDataUrl = '';
  let scannedNationalId = '';
  let scannedInfo = null;
  let errorMessage = '';

  const nationalIdDatabase = {
    '1234567890': {
      name: 'Juan Dela Cruz',
      address: '123 Main St, Anytown',
      dob: 'January 1, 1990',
    },
    '0987654321': {
      name: 'Maria Clara',
      address: '456 Oak Ave, Somewhere',
      dob: 'February 14, 1992',
    },
    '1122334455': {
      name: 'Pedro Penduko',
      address: '789 Pine Ln, Nowhere',
      dob: 'March 20, 1985',
    }
  };

  async function generateQrCode(id) {
    errorMessage = '';
    if (!id) {
      errorMessage = 'Please enter a National ID to generate a QR code.';
      generatedQrCodeDataUrl = '';
      return;
    }

    if (typeof QRCode === 'undefined') {
      errorMessage = 'QRCode library is not loaded.';
      return;
    }

    try {
      generatedQrCodeDataUrl = await QRCode.toDataURL(id, {
        errorCorrectionLevel: 'H',
        width: 256,
        margin: 1
      });
    } catch (err) {
      console.error('QR Code Generation Error:', err);
      errorMessage = 'Failed to generate QR code.';
    }
  }

  async function readQrCode(event) {
    errorMessage = '';
    scannedNationalId = '';
    scannedInfo = null;

    const file = event.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
      errorMessage = 'Please upload a valid image file.';
      return;
    }

    if (typeof jsQR === 'undefined') {
      errorMessage = 'QR reader library (jsQR) is not loaded.';
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          scannedNationalId = code.data;
          fetchNationalIdInfo(scannedNationalId);
        } else {
          errorMessage = 'No QR code found in the image.';
        }
      };
      img.onerror = () => {
        errorMessage = 'Could not load image.';
      };
      img.src = e.target.result;
    };
    reader.onerror = () => {
      errorMessage = 'Failed to read file.';
    };
    reader.readAsDataURL(file);
  }

  function fetchNationalIdInfo(id) {
    if (nationalIdDatabase[id]) {
      const info = { ...nationalIdDatabase[id] };
      info.picture = `/static/pictures/national_id/${id}.png`;
      scannedInfo = info;
    } else {
      errorMessage = `No information found for National ID: ${id}`;
    }
  }

  onMount(() => {
    generateQrCode('1234567890');
  });
</script>
