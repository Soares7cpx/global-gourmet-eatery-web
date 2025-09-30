import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/use-media-query';
import TourRequestForm from './TourRequestForm';
import { Building2 } from 'lucide-react';

interface TourRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TourRequestDialog = ({ open, onOpenChange }: TourRequestDialogProps) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Building2 className="h-6 w-6 text-primary" />
              Agendar Visita ao Espaço
            </DialogTitle>
          </DialogHeader>
          <TourRequestForm onClose={() => onOpenChange(false)} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh] overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2 text-xl">
            <Building2 className="h-5 w-5 text-primary" />
            Agendar Visita
          </DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-8">
          <TourRequestForm onClose={() => onOpenChange(false)} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default TourRequestDialog;
