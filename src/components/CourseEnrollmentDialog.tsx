import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/use-media-query';
import CourseEnrollmentForm from './CourseEnrollmentForm';
import { GraduationCap } from 'lucide-react';

interface CourseEnrollmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CourseEnrollmentDialog = ({ open, onOpenChange }: CourseEnrollmentDialogProps) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <GraduationCap className="h-6 w-6 text-primary" />
              Inscrição em Aulas de Culinária
            </DialogTitle>
          </DialogHeader>
          <CourseEnrollmentForm onClose={() => onOpenChange(false)} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh] overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2 text-xl">
            <GraduationCap className="h-5 w-5 text-primary" />
            Inscrição em Aulas
          </DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-8">
          <CourseEnrollmentForm onClose={() => onOpenChange(false)} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CourseEnrollmentDialog;
