// src/interfaces/ModalProps.ts

import { MemberData } from './MemberData';

export interface ModalProps {
  isVisible: boolean;                    // Boolean for modal visibility
  onClose: () => void;                   // Function for closing modal
  onSubmit: (member: MemberData) => void; // Function for form submission
  memberData?: MemberData;
  mode: 'edit' | 'add';                  // Either 'edit' or 'add' mode
}
