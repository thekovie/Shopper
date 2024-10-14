import * as React from 'react';
import { View } from 'react-native';
import { Switch as SwitchRNR } from '@/components/ui/switch';
import { Text } from '@/components/ui/text';

interface Props {
    label: string
}


function Switch({label}: Props) {
  const [checked, setChecked] = React.useState(false);

  return (
    <>
      <View className='flex-1 p-6 gap-12'>
        <View className='flex-row items-center gap-[8]'>
          <SwitchRNR checked={checked} className={`${checked ? "bg-lonestar-600" : 'bg-lonestar-200'}`} onCheckedChange={setChecked} nativeID='airplane-mode' />
          <Text
            className='text-lonestar-700 !text-xs'
            fontVariant='Medium'
            onPress={() => {
              setChecked((prev) => !prev);
            }}
          >
            { label }
          </Text>
        </View>
      </View>
    </>
  );
}

export default Switch