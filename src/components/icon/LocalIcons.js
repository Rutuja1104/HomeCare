import React from 'react';
import { VEC_ICON_NAME } from './constants';

import SidebarHomeIcon from './vectors/SidebarHomeIcon';
import DummyLogo from './vectors/DummyLogo';
import SidebarNewJoiner from './vectors/SidebarNewJoiner';
import SidebarTodaysTasks from './vectors/SidebarTodaysTasks';
import SidebarMonthlySchedule from './vectors/SidebarMonthlySchedule';
import SidebarMyAccount from './vectors/SidebarMyAccount';
import SidebarContactUsIcon from './vectors/SidebarContactUsIcons';
import SidebarFaqsIcon from './vectors/SidebarFaqsIcon';
import SidebarExpandDotIcon from './vectors/SidebarExpandDotIcon';
import HeaderBackArrow from './vectors/HeaderBackArrow';
import HeaderFilterIcon from './vectors/HeaderFilterIcon';
import HeaderNotificationIcon from './vectors/HeaderNotificationIcon';
import BreadcrumbHomeIcon from './vectors/BreadcrumbHomeIcon';
import CheckboxDashIcon from './vectors/CheckboxDashIcon';
import CheckBoxIcon from './vectors/CheckBoxIcon';
import StepDoneIcon from './vectors/StepDoneIcon';
import AlertRoundedIcon from './vectors/AlertRoundedIcon';
import AddNewIcon from './vectors/AddNewIcon';
import ArrowDownIcon from './vectors/ArrowDownIcon';
import FilterLinesIcon from './vectors/FilterLinesIcon';
import Feather_Upload_Cloud from './vectors/Feather_Upload-Cloud';
import { PlusIcon } from './vectors/PlusIcon';
import FileUploadingIcon from './vectors/FileUploadingIcon';
import IconDropdownCaret from './vectors/IconDropdownCaret';
import RadioButtonIcon from './vectors/RadioButtonIcon';
import FaxIcon from './vectors/FaxIcon';
import EmailIcon from './vectors/EmailIcon';
import WaitingImage from './vectors/WaitingImage';
import GreenEllipse from './vectors/GreenEllipse';
import CorrectIcon from './vectors/CorrectIcon';
import CrossIcon from './vectors/CrossIcon';
import InterviewIcon from './vectors/InterviewIcon';
import FinalResultImage from './vectors/FinalResultImage';
import SectionIcon from './vectors/SectionIcon';
import EllipseGreyIcon from './vectors/EllipseGreyIcon';
import FinalResult from '../../pages/NurseOnboarding/JobApplication/FinalResult/FinalResult';
import VectorIcon from './vectors/VectorIcon';
import IconLeft from './vectors/IconLeft';
import CallIcon from './vectors/CallIcon';
import EmailsIcons from './vectors/EmailsIcons';
import LocationIcon from './vectors/LocationIon';
import LocationIcon2 from './vectors/LocationIcon2';
import Description from './vectors/Description';
import CalenderIcon from './vectors/CalenderIcon';
import BookmarkIcon from './vectors/BookmarkIcon';
import Building from './vectors/Building';
import DollarIcon from './vectors/DollarIcon';
import ArrowDownIconSidebar from './vectors/ArrowDownIconSidebar';
import LocationIcon3 from './vectors/LocationIcon3';
import IconRight from './vectors/IconRight';
import IconLeft2 from './vectors/IconLeft2';
import ArrowRightIcon from './vectors/ArrowRightIcon';
import PatientObBoardingIcon from './vectors/PatientOnBoardingIcon';
import JobApplicationIcon from './vectors/JobApplicationIcon';
import PendingClaims from './vectors/PendingClaims';
import FilledUpArrow from './vectors/FilledUpArrow';
import EpisodeIcon from './vectors/EpisodeIcon';
import ScheduleIcon from './vectors/ScheduleIcon';
import TaskListIcon from './vectors/TaskListIcon';
import ProgressNotesIcon from './vectors/ProgressNotesIcon';
import MedicationIcon from './vectors/MedicationIcon';
import VitalSignIcon from './vectors/VitalSignIcon';
import ClaimsIcon from './vectors/ClaimsIcon';
import PacketIcon from './vectors/PacketIcon';
import Inbox from './vectors/Inbox';
import Favorites from './vectors/Favorites';
import Send from './vectors/Send';
import Drafts from './vectors/Drafts';
import Trash from './vectors/Trash';
import TrippleDot from './vectors/TrippleDot';
import Star from './vectors/Star';
import SearchIcon from './vectors/SearchIcon';
import GreenDot from './vectors/GreenDot';
import ArrowLeftIcon from './vectors/ArrowLeftIcon';
import OpenIcon from './vectors/OpenIcon';
import PrinterIcon from './vectors/PrinterIcon';
import ReplyIcon from './vectors/ReplyIcon';
import EmailRow from './vectors/EmailRow';
import SideNavInfoIcon from './vectors/SideNavInfoIcon';
import SideNavDeleteIcon from './vectors/SideNavDeleteIcon';
import Avtar from './vectors/Avtar';
import ArrowDown from './vectors/ArrowDown';
import ForwardIcon from './vectors/ForwardIcon';
import PlusColorIcon from './vectors/PlusColorIcon';
import RightArrow from './vectors/RightArrow';
import SearchWhiteIcon from './vectors/SearchWhiteIcon';
import InfoOutlined from './vectors/InfoOutlined';
import SearchTransparent from './vectors/SearchTransparent';
import PrinterWhite from './vectors/printerWhite';
import DownloadList from './vectors/DownloadList';
import RedDot from './vectors/RedDot';
import InfoRedIcon from './vectors/InfoRedIcon';
import DollarBlue from './vectors/DollarBlue';
import DownloadBlue from './vectors/DownloadBlue';
import DownBlueArrow from './vectors/DownBlueArrow';
import SuccessGreenArrow from './vectors/SuccessGreenArrow';
import ArrowRightBlack from './vectors/ArrowRightBlack';
import EmailBoxIcon from './vectors/EmailBoxIcon';
import RefreshIcon from './vectors/RefreshIcon';
import PrinterIconFilled from './vectors/PrinterIconFilled';
import SaveIcon from './vectors/SaveIcon';
import CopyIcon from './vectors/CopyIcon';
import InboundIcon from './vectors/InboundIcon';
import OutboundIcon from './vectors/OutboundIcon';
import CameraIcon from './vectors/CameraIcon';

export default function LocalIcons({ iconName, color, style = {}, transformScale, rotateDeg = 0 }) {
    const iconProps = {
        style: {
            ...style,
            transform: `scale(${transformScale}) rotate(${rotateDeg}deg)`
        },
        fill: color,
        stroke: color
    };

    /* eslint-disable */
    switch (iconName) {
        case VEC_ICON_NAME.SIDEBAR_HOME_ICON:
            return <SidebarHomeIcon {...iconProps} />;
        case VEC_ICON_NAME.DUMMY_LOGO:
            return <DummyLogo {...iconProps} />;
        case VEC_ICON_NAME.SIDEBAR_NEW_JOINER:
            return <SidebarNewJoiner {...iconProps} />;
        case VEC_ICON_NAME.SIDEBAR_TODAYS_TASKS:
            return <SidebarTodaysTasks {...iconProps} />;
        case VEC_ICON_NAME.SIDEBAR_MONTHLY_SCHEDULE:
            return <SidebarMonthlySchedule {...iconProps} />;
        case VEC_ICON_NAME.SIDEBAR_MY_ACCOUNT:
            return <SidebarMyAccount {...iconProps} />;
        case VEC_ICON_NAME.SIDEBAR_CONTACT_US_ICON:
            return <SidebarContactUsIcon {...iconProps} />;
        case VEC_ICON_NAME.SIDEBAR_FAQS_ICON:
            return <SidebarFaqsIcon {...iconProps} />;
        case VEC_ICON_NAME.SIDEBAR_EXPAND_DOT_ICON:
            return <SidebarExpandDotIcon {...iconProps} />;
        case VEC_ICON_NAME.HEADER_BACK_ARROW:
            return <HeaderBackArrow {...iconProps} />;
        case VEC_ICON_NAME.HEADER_FILTER_ICON:
            return <HeaderFilterIcon {...iconProps} />;
        case VEC_ICON_NAME.HEADER_NOTIFICATION_ICON:
            return <HeaderNotificationIcon {...iconProps} />;
        case VEC_ICON_NAME.BREADCRUMB_HOME_ICON:
            return <BreadcrumbHomeIcon {...iconProps} />;
        case VEC_ICON_NAME.CHECKBOX_DASH_ICON:
            return <CheckboxDashIcon {...iconProps} />;
        case VEC_ICON_NAME.CHECKBOX_ICON:
            return <CheckBoxIcon {...iconProps} />;
        case VEC_ICON_NAME.STEP_DONE_ICON:
            return <StepDoneIcon {...iconProps} />;
        case VEC_ICON_NAME.ALERT_ROUNDED_ICON:
            return <AlertRoundedIcon {...iconProps} />;
        case VEC_ICON_NAME.ADD_NEW_ICON:
            return <AddNewIcon {...iconProps} />;
        case VEC_ICON_NAME.ARROW_DOWN_ICON:
            return <ArrowDownIcon {...iconProps} />;
        case VEC_ICON_NAME.FILTER_LINES_ICON:
            return <FilterLinesIcon {...iconProps} />;
        case VEC_ICON_NAME.FEATHER_UPLOAD_CLOUD_ICON:
            return <Feather_Upload_Cloud />;
        case VEC_ICON_NAME.PLUS_ICON:
            return <PlusIcon />;
        case VEC_ICON_NAME.FILE_UPLOADING_ICON:
            return <FileUploadingIcon />;
        case VEC_ICON_NAME.ICON_DROPDOWN_CARET:
            return <IconDropdownCaret />;
        case VEC_ICON_NAME.RADIO_BUTTON_ICON:
            return <RadioButtonIcon {...iconProps} />;
        case VEC_ICON_NAME.FAX_ICON:
            return <FaxIcon />;
        case VEC_ICON_NAME.EMAIL_ICON:
            return <EmailIcon />;
        case VEC_ICON_NAME.WAITING_IMAGE:
            return <WaitingImage />;
        case VEC_ICON_NAME.GREEN_ELLIPSE:
            return <GreenEllipse />;
        case VEC_ICON_NAME.CORRECT_ICON:
            return <CorrectIcon {...iconProps} />;
        case VEC_ICON_NAME.CROSS_ICON:
            return <CrossIcon />;
        case VEC_ICON_NAME.INTERVIEW_ICON:
            return <InterviewIcon />;
        case VEC_ICON_NAME.FINAL_RESULT_IMAGE:
            return <FinalResultImage />;
        case VEC_ICON_NAME.SECTION_ICON:
            return <SectionIcon />;
        case VEC_ICON_NAME.ELLIPSE_GREY_ICON:
            return <EllipseGreyIcon />;
        case VEC_ICON_NAME.VECTOR_ICON:
            return <VectorIcon />;
        case VEC_ICON_NAME.ICON_LEFT:
            return <IconLeft />;
        case VEC_ICON_NAME.CALL_ICON:
            return <CallIcon />;
        case (VEC_ICON_NAME.MAIL_OUTLINE):
            return <EmailsIcons />;
        case VEC_ICON_NAME.LOCATION_ICON:
            return <LocationIcon />
        case VEC_ICON_NAME.LOCATION_ICON_2:
            return <LocationIcon2 />
        case VEC_ICON_NAME.DESCRIPTION_ICON:
            return <Description />
        case VEC_ICON_NAME.CALENDER_ICON:
            return <CalenderIcon />
        case VEC_ICON_NAME.BOOKMARK_ICON:
            return <BookmarkIcon />
        case VEC_ICON_NAME.BUILDING_ICON:
            return <Building />
        case VEC_ICON_NAME.DOLLAR_ICON:
            return <DollarIcon {...iconProps} />
        case VEC_ICON_NAME.ARROW_DOWN_ICON_SIDEBAR:
            return <ArrowDownIconSidebar {...iconProps} />
        case VEC_ICON_NAME.LOCATION_ICON_3:
            return <LocationIcon3 {...iconProps} />
        case VEC_ICON_NAME.ICON_RIGHT:
            return <IconRight {...iconProps} />
        case VEC_ICON_NAME.ICON_LEFT_2:
            return <IconLeft2 {...iconProps} />
        case VEC_ICON_NAME.ARROW_RIGHT_ICON:
            return <ArrowRightIcon />
        case VEC_ICON_NAME.PATIENT_ONBOARDING:
            return <PatientObBoardingIcon />
        case VEC_ICON_NAME.JOB_APPLICATION_ICON:
            return <JobApplicationIcon />
        case VEC_ICON_NAME.PENDING_CLAIMS:
            return <PendingClaims />
        case VEC_ICON_NAME.UP_ARROW:
            return <FilledUpArrow />
        case VEC_ICON_NAME.EPISODE_ICON:
            return <EpisodeIcon />
        case VEC_ICON_NAME.SCHEDULE_ICON:
            return <ScheduleIcon />
        case VEC_ICON_NAME.TASK_LIST_ICON:
            return <TaskListIcon />
        case VEC_ICON_NAME.PROGRESS_NOTES_ICON:
            return <ProgressNotesIcon />
        case VEC_ICON_NAME.MEDICATION_ICON:
            return <MedicationIcon />
        case VEC_ICON_NAME.VITAL_SIGNS_ICON:
            return <VitalSignIcon />
        case VEC_ICON_NAME.CLAIMS_ICON:
            return <ClaimsIcon />
        case VEC_ICON_NAME.PACKET_ICON:
            return <PacketIcon />
        case VEC_ICON_NAME.Inbox:
            return <Inbox />
        case VEC_ICON_NAME.Favorites:
            return <Favorites />
        case VEC_ICON_NAME.Send:
            return <Send />
        case VEC_ICON_NAME.Drafts:
            return <Drafts />
        case VEC_ICON_NAME.Trash:
            return <Trash />
        case VEC_ICON_NAME.TrippleDot:
            return <TrippleDot />
        case VEC_ICON_NAME.Star:
            return <Star />
        case VEC_ICON_NAME.SearchIcon:
            return <SearchIcon />
        case VEC_ICON_NAME.GreenDot:
            return <GreenDot />
        case VEC_ICON_NAME.ArrowLeftIcon:
            return <ArrowLeftIcon />
        case VEC_ICON_NAME.OpenIcon:
            return <OpenIcon />
        case VEC_ICON_NAME.PrinterIcon:
            return <PrinterIcon />
        case VEC_ICON_NAME.ReplyIcon:
            return <ReplyIcon />
        case VEC_ICON_NAME.EmailRow:
            return <EmailRow />
        case VEC_ICON_NAME.SideNavInfoIcon:
            return <SideNavInfoIcon />
        case VEC_ICON_NAME.SideNavDeleteIcon:
            return <SideNavDeleteIcon />
        case VEC_ICON_NAME.Avtar:
            return <Avtar />
        case VEC_ICON_NAME.ArrowDown:
            return <ArrowDown />
        case VEC_ICON_NAME.ForwardIcon:
            return <ForwardIcon />
        case VEC_ICON_NAME.PlusColorIcon:
            return <PlusColorIcon />
        case VEC_ICON_NAME.RightArrow:
            return <RightArrow />
        case VEC_ICON_NAME.SearchWhiteIcon:
            return <SearchWhiteIcon />
        case VEC_ICON_NAME.InfoOutlined:
            return <InfoOutlined />
        case VEC_ICON_NAME.SearchTransparent:
            return <SearchTransparent />
        case VEC_ICON_NAME.PrinterWhite:
            return <PrinterWhite />
        case VEC_ICON_NAME.DownloadList:
            return <DownloadList />
        case VEC_ICON_NAME.RedDot:
            return <RedDot />
        case VEC_ICON_NAME.InfoRedIcon:
            return <InfoRedIcon />
        case VEC_ICON_NAME.DollarBlue:
            return <DollarBlue />
        case VEC_ICON_NAME.DownloadBlue:
            return <DownloadBlue />
        case VEC_ICON_NAME.DownBlueArrow:
            return <DownBlueArrow />
        case VEC_ICON_NAME.SuccessGreenArrow:
            return <SuccessGreenArrow />
        case VEC_ICON_NAME.ArrowRightBlack:
            return <ArrowRightBlack />
        case VEC_ICON_NAME.EmailBoxIcon:
            return <EmailBoxIcon />
        case VEC_ICON_NAME.RefreshIcon:
            return <RefreshIcon />
        case VEC_ICON_NAME.PrinterIconFilled:
            return <PrinterIconFilled />
        case VEC_ICON_NAME.SaveIcon:
            return <SaveIcon />
        case VEC_ICON_NAME.Inbound_Icon:
            return <InboundIcon />
        case VEC_ICON_NAME.Outbound_Icon:
            return <OutboundIcon />
        case VEC_ICON_NAME.COPY_ICON:
            return <CopyIcon />
        case VEC_ICON_NAME.CAMERA_ICON:
            return <CameraIcon />

        default:
            return <SidebarHomeIcon {...iconProps} />;
    }
    /* eslint-enable */
}
