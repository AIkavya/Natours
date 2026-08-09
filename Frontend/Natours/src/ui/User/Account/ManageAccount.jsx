import { useState } from "react";

import {
  Page,
  Header,
  Title,
  Subtitle,
  DesktopTabsWrapper,
  DesktopContentWrapper,
  Tabs,
  Tab,
  Content,
  AccordionContainer,
  AccordionItem,
  AccordionHeader,
  AccordionTitleGroup,
  AccordionBody,
} from "./ManageAccount.styles";

import {
  LuUser,
  LuLock,
  LuTrash2,
  LuChevronDown,
} from "react-icons/lu";

import PersonalInformation from "./PersonalInformation/PersonalInformation";
import ChangePassword from "./PersonalInformation/ChangePassword";
import DeleteAccount from "./PersonalInformation/DeleteAccount";

function ManageAccount() {
  const [activeTab, setActiveTab] = useState("personal");

  // Track accordion state for tablet/mobile viewports
  const [openSections, setOpenSections] = useState({
    personal: true,
    password: false,
    delete: false,
  });

  const toggleSection = (sectionKey) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  return (
    <Page>
      <Header>
        <Title>Manage Account</Title>

        <Subtitle>
          Update your profile information, password and account settings.
        </Subtitle>
      </Header>

      {/* ==========================================
          DESKTOP TABS ARCHITECTURE (>= 1024px)
         ========================================== */}
      <DesktopTabsWrapper>
        <Tabs>
          <Tab
            active={activeTab === "personal"}
            onClick={() => setActiveTab("personal")}
          >
            Personal Information
          </Tab>

          <Tab
            active={activeTab === "password"}
            onClick={() => setActiveTab("password")}
          >
            Change Password
          </Tab>

          <Tab
            danger
            active={activeTab === "delete"}
            onClick={() => setActiveTab("delete")}
          >
            Delete Account
          </Tab>
        </Tabs>
      </DesktopTabsWrapper>

      <DesktopContentWrapper>
        <Content>
          {activeTab === "personal" && <PersonalInformation />}
          {activeTab === "password" && <ChangePassword />}
          {activeTab === "delete" && <DeleteAccount />}
        </Content>
      </DesktopContentWrapper>

      {/* ==========================================
          TABLET & MOBILE COLLAPSIBLE ACCORDION ARCHITECTURE (< 1024px)
         ========================================== */}
      <AccordionContainer>
        {/* SECTION 1: PERSONAL INFORMATION */}
        <AccordionItem $isOpen={openSections.personal}>
          <AccordionHeader
            type="button"
            $isOpen={openSections.personal}
            onClick={() => toggleSection("personal")}
          >
            <AccordionTitleGroup>
              <LuUser />
              <span>Personal Information</span>
            </AccordionTitleGroup>
            <LuChevronDown className="chevron" />
          </AccordionHeader>

          {openSections.personal && (
            <AccordionBody>
              <PersonalInformation />
            </AccordionBody>
          )}
        </AccordionItem>

        {/* SECTION 2: CHANGE PASSWORD */}
        <AccordionItem $isOpen={openSections.password}>
          <AccordionHeader
            type="button"
            $isOpen={openSections.password}
            onClick={() => toggleSection("password")}
          >
            <AccordionTitleGroup>
              <LuLock />
              <span>Change Password</span>
            </AccordionTitleGroup>
            <LuChevronDown className="chevron" />
          </AccordionHeader>

          {openSections.password && (
            <AccordionBody>
              <ChangePassword />
            </AccordionBody>
          )}
        </AccordionItem>

        {/* SECTION 3: DELETE ACCOUNT */}
        <AccordionItem $isOpen={openSections.delete} $danger>
          <AccordionHeader
            type="button"
            $isOpen={openSections.delete}
            $danger
            onClick={() => toggleSection("delete")}
          >
            <AccordionTitleGroup>
              <LuTrash2 />
              <span>Delete Account</span>
            </AccordionTitleGroup>
            <LuChevronDown className="chevron" />
          </AccordionHeader>

          {openSections.delete && (
            <AccordionBody>
              <DeleteAccount />
            </AccordionBody>
          )}
        </AccordionItem>
      </AccordionContainer>
    </Page>
  );
}

export default ManageAccount;
