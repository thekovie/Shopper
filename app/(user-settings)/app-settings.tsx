import React from 'react';
import { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { Text } from '@/components/ui/text';
import CancelChangesPage from '@/components/add-shopping-item/CancelChanges'; 
import { ArrowLeft } from "@/lib/icons";
import Switch from '@/components/Switch';

function AppSettings() {
    const [isDiscardChangesDialogOpen, setDiscardChangesDialogOpen] = useState(false);
    return (
        <ScrollView className="flex flex-col p-[20]"
                style={{
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
                flex: 1
            }}
        >
            <View className="flex flex-row mb-[4] items-center">
                <CancelChangesPage
                    toggleDialog={setDiscardChangesDialogOpen}
                    isDialogOpen={isDiscardChangesDialogOpen}
                    trigger={
                        <TouchableOpacity>
                            <ArrowLeft className="text-lonestar-400 mr-[10]" size={24}/>
                        </TouchableOpacity>
                    }
                />

                <Text 
                    className=" text-lonestar-500 text-xl"
                    fontVariant="Bold"
                >
                    App Settings
                </Text> 
            </View>

            <Switch label='Dark mode (Beta)' />


        </ScrollView>
    );
}

export default AppSettings;