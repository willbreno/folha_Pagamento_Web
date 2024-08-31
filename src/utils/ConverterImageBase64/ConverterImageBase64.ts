
interface blobProps {
    file: File | null
    setFile: (value: File | null) => void
    base64URL: string
    setBase64URL: (value: string) => void
    e: React.ChangeEvent<HTMLInputElement>
}

const getBase64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            const baseURL = reader.result as string;
            resolve(baseURL);
        };
    });
};

export const handleFileInputChange = ({ e, base64URL, file, setBase64URL, setFile }: blobProps) => {
    if (e.target.files && e.target.files[0]) {
        const selectedFile = e.target.files[0];

        getBase64(selectedFile)
            .then((result) => {
                //@ts-ignore
                selectedFile['base64'] = result;
                setFile(selectedFile);
                setBase64URL(result);
                //console.log(base64URL)
            })
            .catch((err) => {
                console.log(err);
            });
    }
};