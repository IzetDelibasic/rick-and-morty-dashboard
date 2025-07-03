import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { RmButtonComponent } from './rm-button.component';
import { ButtonModule } from 'primeng/button';

const meta: Meta<RmButtonComponent> = {
  title: 'Shared/Button',
  component: RmButtonComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A reusable button component.',
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [ButtonModule],
    }),
  ],
  argTypes: {
    severity: {
      control: 'select',
      options: [undefined, 'secondary', 'success', 'info', 'warn', 'help', 'danger', 'contrast'],
    },
    variant: {
      control: 'select',
      options: [undefined, 'outlined', 'text'],
    },
    size: {
      control: 'select',
      options: [undefined, 'small', 'large'],
    },
  },
};

export default meta;

type Story = StoryObj<RmButtonComponent>;

export const Primary: Story = {
  args: {
    label: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    severity: 'secondary',
  },
};

export const Danger: Story = {
  args: {
    label: 'Delete',
    severity: 'danger',
  },
};

export const Outlined: Story = {
  args: {
    label: 'Outlined Button',
    variant: 'outlined',
  },
};

export const Text: Story = {
  args: {
    label: 'Text Button',
    variant: 'text',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Save',
    icon: 'pi pi-save',
  },
};

export const IconOnly: Story = {
  args: {
    icon: 'pi pi-cog',
  },
};

export const Loading: Story = {
  args: {
    label: 'Loading...',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    label: 'Small Button',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Button',
    size: 'large',
  },
};
