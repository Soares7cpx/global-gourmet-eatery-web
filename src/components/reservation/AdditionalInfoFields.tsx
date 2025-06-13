
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from './FormSchema';

interface AdditionalInfoFieldsProps {
  form: UseFormReturn<FormValues>;
}

const AdditionalInfoFields = ({ form }: AdditionalInfoFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="occasion"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ocasião (opcional)</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="aniversario">Aniversário</SelectItem>
                <SelectItem value="reuniao">Reunião</SelectItem>
                <SelectItem value="romantica">Jantar Romântico</SelectItem>
                <SelectItem value="corporativo">Evento Corporativo</SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              Nos ajuda a preparar seu ambiente
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Alguma observação? (opcional)</FormLabel>
            <FormControl>
              <Input placeholder="Alergias, preferências, etc." {...field} />
            </FormControl>
            <FormDescription>
              Fique à vontade para nos informar sobre preferências alimentares ou alergias
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default AdditionalInfoFields;
