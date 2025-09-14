-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 06, 2025 at 06:01 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_technolab`
--

-- --------------------------------------------------------

--
-- Table structure for table `child_course_master`
--

CREATE TABLE `child_course_master` (
  `id` int(10) NOT NULL,
  `Child_ID` varchar(10) NOT NULL,
  `Child_Course_Name` varchar(50) NOT NULL,
  `Duration(Months)` int(2) NOT NULL,
  `Fees` int(10) NOT NULL,
  `CreateDate` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course_category_master`
--

CREATE TABLE `course_category_master` (
  `id` int(10) NOT NULL,
  `Course_id` varchar(10) NOT NULL,
  `Category` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course_detail_master`
--

CREATE TABLE `course_detail_master` (
  `id` int(10) NOT NULL,
  `Content_ID` varchar(10) NOT NULL,
  `Course_Content_Name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course_prerequisite_master`
--

CREATE TABLE `course_prerequisite_master` (
  `id` int(10) NOT NULL,
  `PreReq_ID` varchar(10) NOT NULL,
  `Course_PreRequisite` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `master_nf2`
--

CREATE TABLE `master_nf2` (
  `id` int(11) NOT NULL,
  `Category_Id` int(11) NOT NULL,
  `Parent_ID` int(11) NOT NULL,
  `Child_ID` int(11) NOT NULL,
  `Content_ID` int(11) NOT NULL,
  `PreReq_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `parent_course_master`
--

CREATE TABLE `parent_course_master` (
  `id` int(10) NOT NULL,
  `Parent_ID` varchar(10) NOT NULL,
  `Parent_Name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `register_logs`
--

CREATE TABLE `register_logs` (
  `id` int(11) NOT NULL,
  `registration_id` int(11) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `middleName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `parentFirstName` varchar(20) NOT NULL,
  `parentMiddleName` varchar(20) NOT NULL,
  `parentLastName` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `dob` varchar(10) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `country` varchar(15) NOT NULL,
  `presentAddress` varchar(50) NOT NULL,
  `permanentAddress` varchar(50) NOT NULL,
  `state` varchar(20) NOT NULL,
  `city` varchar(20) NOT NULL,
  `pin` varchar(10) NOT NULL,
  `qualification` varchar(20) NOT NULL,
  `year` varchar(10) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `coursetype` varchar(50) NOT NULL,
  `message` varchar(100) NOT NULL,
  `IsDeleted` int(11) NOT NULL,
  `DateOfRegister` varchar(20) DEFAULT NULL,
  `DateOfModify` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `register_logs`
--

INSERT INTO `register_logs` (`id`, `registration_id`, `firstName`, `middleName`, `lastName`, `parentFirstName`, `parentMiddleName`, `parentLastName`, `email`, `phone`, `dob`, `gender`, `country`, `presentAddress`, `permanentAddress`, `state`, `city`, `pin`, `qualification`, `year`, `subject`, `coursetype`, `message`, `IsDeleted`, `DateOfRegister`, `DateOfModify`) VALUES
(1, 0, 'arnab_08', 'bubai', 'Adhikary', 'TST', 'TST', 'TST', 'asd@gmail.com', '943594945', '2025-07-27', 'Male', 'as', 'ggdfg', 'tst', 'wa', 'sd', '12552255', '', '0000-00-00', '', '', '', 0, NULL, '2025-08-01 01:01:36'),
(2, 0, 'arnab_09', 'bubai', 'Adhikary', 'TST', 'TST', 'TST', 'asd@gmail.com', '943594945', '2025-07-27', 'Male', 'as', 'ggdfg', 'tst', 'wa', 'sd', '12552255', '', '0000-00-00', '', '', '', 0, NULL, '2025-08-01 01:06:10'),
(3, 0, 'arnab_10', 'bubai', 'Adhikary', 'TST', 'TST', 'TST', 'asd@gmail.com', '943594945', '2025-07-27', 'Male', 'as', 'ggdfg', 'tst', 'wa', 'sd', '12552255', '', '0000-00-00', '', '', '', 0, NULL, '2025-08-02 21:53:59'),
(4, 0, 'arnab_11', 'bubai', 'Adhikary', 'TST', 'TST', 'TST', 'asd@gmail.com', '943594945', '2025-07-27', 'Male', 'as', 'ggdfg', 'tst', 'wa', 'sd', '12552255', '', '0000-00-00', '', '', '', 0, NULL, '2025-08-02 21:54:53');

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `id` int(11) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `middleName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `parentFirstName` varchar(20) NOT NULL,
  `parentMiddleName` varchar(20) NOT NULL,
  `parentLastName` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `dob` varchar(10) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `country` varchar(20) NOT NULL,
  `presentAddress` varchar(50) NOT NULL,
  `permanentAddress` varchar(50) NOT NULL,
  `state` varchar(20) NOT NULL,
  `city` varchar(20) NOT NULL,
  `pin` varchar(10) NOT NULL,
  `qualification` varchar(20) NOT NULL,
  `year` date NOT NULL,
  `subject` varchar(100) NOT NULL,
  `coursetype` varchar(50) NOT NULL,
  `message` varchar(100) NOT NULL,
  `IsDeleted` int(1) NOT NULL,
  `DateOfRegister` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registration`
--

INSERT INTO `registration` (`id`, `firstName`, `middleName`, `lastName`, `parentFirstName`, `parentMiddleName`, `parentLastName`, `email`, `phone`, `dob`, `gender`, `country`, `presentAddress`, `permanentAddress`, `state`, `city`, `pin`, `qualification`, `year`, `subject`, `coursetype`, `message`, `IsDeleted`, `DateOfRegister`) VALUES
(14, 'arnab_11', 'bubai', 'Adhikary', 'TST', 'TST', 'TST', 'asd@gmail.com', '943594945', '2025-07-27', 'Male', 'as', 'ggdfg', 'tst', 'wa', 'sd', '12552255', '', '0000-00-00', '', '', '', 0, '2025-07-27 10:20:27');

-- --------------------------------------------------------

--
-- Table structure for table `tab_adminlogin`
--

CREATE TABLE `tab_adminlogin` (
  `id` int(50) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tab_adminlogin`
--

INSERT INTO `tab_adminlogin` (`id`, `username`, `password`) VALUES
(1, 'admin', '123'),
(2, 'arnab', '12345'),
(4, 'technoadmin', 'admin123');

-- --------------------------------------------------------

--
-- Table structure for table `tab_techno`
--

CREATE TABLE `tab_techno` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `recipient` varchar(50) NOT NULL,
  `subject` varchar(150) NOT NULL,
  `message` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tab_techno`
--

INSERT INTO `tab_techno` (`id`, `name`, `email`, `recipient`, `subject`, `message`) VALUES
(62, 'axc', 'yuu', 'fdd', 'kiu', 'htr'),
(64, 'gg', 'ghh', 'fjjdd', 'kkkiu', 'll'),
(65, 'rrr', 'ttt', '', 'jjh', 'gf'),
(66, 'test', 'test', '', 'test', 'test');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `child_course_master`
--
ALTER TABLE `child_course_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course_category_master`
--
ALTER TABLE `course_category_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course_detail_master`
--
ALTER TABLE `course_detail_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course_prerequisite_master`
--
ALTER TABLE `course_prerequisite_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_nf2`
--
ALTER TABLE `master_nf2`
  ADD PRIMARY KEY (`id`),
  ADD KEY `CourseCategoryMaster` (`Category_Id`),
  ADD KEY `ParentCourseMaster` (`Parent_ID`),
  ADD KEY `ChildCourseMaster` (`Child_ID`),
  ADD KEY `CourseDetailMaster` (`Content_ID`),
  ADD KEY `CoursePreRequisiteMaster` (`PreReq_ID`);

--
-- Indexes for table `parent_course_master`
--
ALTER TABLE `parent_course_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `register_logs`
--
ALTER TABLE `register_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `registration_id_fk` (`registration_id`);

--
-- Indexes for table `registration`
--
ALTER TABLE `registration`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tab_adminlogin`
--
ALTER TABLE `tab_adminlogin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tab_techno`
--
ALTER TABLE `tab_techno`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `child_course_master`
--
ALTER TABLE `child_course_master`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `course_category_master`
--
ALTER TABLE `course_category_master`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `course_detail_master`
--
ALTER TABLE `course_detail_master`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `course_prerequisite_master`
--
ALTER TABLE `course_prerequisite_master`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `master_nf2`
--
ALTER TABLE `master_nf2`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `parent_course_master`
--
ALTER TABLE `parent_course_master`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `register_logs`
--
ALTER TABLE `register_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `registration`
--
ALTER TABLE `registration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tab_adminlogin`
--
ALTER TABLE `tab_adminlogin`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tab_techno`
--
ALTER TABLE `tab_techno`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `master_nf2`
--
ALTER TABLE `master_nf2`
  ADD CONSTRAINT `ChildCourseMaster` FOREIGN KEY (`Child_ID`) REFERENCES `child_course_master` (`id`),
  ADD CONSTRAINT `CourseCategoryMaster` FOREIGN KEY (`Category_Id`) REFERENCES `course_category_master` (`id`),
  ADD CONSTRAINT `CourseDetailMaster` FOREIGN KEY (`Content_ID`) REFERENCES `course_detail_master` (`id`),
  ADD CONSTRAINT `CoursePreRequisiteMaster` FOREIGN KEY (`PreReq_ID`) REFERENCES `course_prerequisite_master` (`id`),
  ADD CONSTRAINT `ParentCourseMaster` FOREIGN KEY (`Parent_ID`) REFERENCES `parent_course_master` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
