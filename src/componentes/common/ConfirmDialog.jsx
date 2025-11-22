// Componente de Diálogo de Confirmación (Modal)
const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
    // Si no está abierto, no renderizar nada
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#181818] rounded-lg max-w-md w-full p-6 shadow-2xl border border-[#2f2f2f]">
                <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
                <p className="text-[#b3b3b3] mb-6 leading-relaxed">{message}</p>
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-[#2f2f2f] text-white rounded-md hover:bg-[#3f3f3f] transition-colors font-medium"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="px-6 py-2 bg-[#e50914] text-white rounded-md hover:bg-[#f40612] transition-colors font-medium"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
