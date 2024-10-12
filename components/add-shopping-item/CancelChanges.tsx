import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
  } from '@/components/ui/alert-dialog';
  import { Button } from '@/components/ui/button';
  import { Text } from '@/components/ui/text';
  import { X } from "@/lib/icons";
  
  
  function CancelChangesPage() {
    const [open, setOpen] = useState(false);

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <TouchableOpacity>
                <View className="flex flex-row-reverse n items-center mb-[4]">
                    <X className="text-lonestar-400" size={24} />
                </View>
            </TouchableOpacity>
            
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <Text className='text-lonestar-600 text-lg' fontVariant='Bold'>Are you sure?</Text>
              <Text className='text-lonestar-700 text-xs' fontVariant='Medium'>Your changes will be discarded if you proceed.</Text>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <Button variant={'outline'} onPress={() => {
                    setOpen(false);
                    router.replace({ pathname: '/(tabs)/' });
                }}>
                    <Text className='text-lonestar-600 text-sm'>Discard changes</Text>
                </Button>
                <Button onPress={() => setOpen(false)}>
                    <Text className='text-[#ffffff]'>Oops, bring me back</Text>
                </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
    );
  }

  export default CancelChangesPage;