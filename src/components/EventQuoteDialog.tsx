
import { useMediaQuery } from '@/hooks/use-media-query';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import EventQuoteForm from '@/components/EventQuoteForm';

interface EventQuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EventQuoteDialog = ({ open, onOpenChange }: EventQuoteDialogProps) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="sr-only">Solicitar Orçamento para Eventos</DialogTitle>
          </DialogHeader>
          <EventQuoteForm onClose={() => onOpenChange(false)} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="text-left">
          <DrawerTitle className="sr-only">Solicitar Orçamento para Eventos</DrawerTitle>
        </DrawerHeader>
        <div className="overflow-y-auto">
          <EventQuoteForm onClose={() => onOpenChange(false)} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default EventQuoteDialog;
