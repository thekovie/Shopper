import { useState, ReactNode } from 'react';
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

  type CancelChangesPageProps = {
    isDialogOpen: boolean;
    trigger: ReactNode;
    toggleDialog: React.Dispatch<React.SetStateAction<boolean>>;
  };
  
  
  function CancelChangesPage({ isDialogOpen, trigger, toggleDialog }: CancelChangesPageProps) {

    return (
        <AlertDialog open={isDialogOpen} onOpenChange={toggleDialog}>
          <AlertDialogTrigger asChild>
            {trigger}
          </AlertDialogTrigger>
          <AlertDialogContent className='bg-white'>
            <AlertDialogHeader>
              <Text className='text-lonestar-600 text-lg' fontVariant='Bold'>Are you sure?</Text>
              <Text className='text-lonestar-700 text-xs' fontVariant='Medium'>Your changes will be discarded if you proceed.</Text>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <Button className={
                      "w-full border border-lonestar-600 bg-white text-lonestar-500"
                    } onPress={() => {
                    toggleDialog(false);
                    router.back();
                }}>
                    <Text className='text-lonestar-600 !text-sm'>Discard changes</Text>
                </Button>
                <Button onPress={() => toggleDialog(false)}>
                    <Text className='text-[#ffffff] !text-sm'>Oops, bring me back</Text>
                </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
    );
  }

  export default CancelChangesPage;