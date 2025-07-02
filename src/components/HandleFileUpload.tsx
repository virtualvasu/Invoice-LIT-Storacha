type HandleFileUploadProps = {
    onFileSelect: (file: File) => void;
  };
  
  export default function HandleFileUpload({ onFileSelect }: HandleFileUploadProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) onFileSelect(selectedFile);
    };
  
    return (
      <div>
        <input type="file" onChange={handleChange} className="border p-1" />
      </div>
    );
  }
  