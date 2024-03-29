USE [master]
GO
/****** Object:  Database [DWHCARSgilly]    Script Date: 01/02/2024 13:27:49 ******/
CREATE DATABASE [DWHCARSgilly]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'DWHCARSgilly', FILENAME = N'D:\MSSQL\Data\DWHCARSgilly.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'DWHCARSgilly_log', FILENAME = N'D:\MSSQL\Data\DWHCARSgilly_log.ldf' , SIZE = 139264KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [DWHCARSgilly] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [DWHCARSgilly].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [DWHCARSgilly] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [DWHCARSgilly] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [DWHCARSgilly] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [DWHCARSgilly] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [DWHCARSgilly] SET ARITHABORT OFF 
GO
ALTER DATABASE [DWHCARSgilly] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [DWHCARSgilly] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [DWHCARSgilly] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [DWHCARSgilly] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [DWHCARSgilly] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [DWHCARSgilly] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [DWHCARSgilly] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [DWHCARSgilly] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [DWHCARSgilly] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [DWHCARSgilly] SET  ENABLE_BROKER 
GO
ALTER DATABASE [DWHCARSgilly] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [DWHCARSgilly] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [DWHCARSgilly] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [DWHCARSgilly] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [DWHCARSgilly] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [DWHCARSgilly] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [DWHCARSgilly] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [DWHCARSgilly] SET RECOVERY FULL 
GO
ALTER DATABASE [DWHCARSgilly] SET  MULTI_USER 
GO
ALTER DATABASE [DWHCARSgilly] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [DWHCARSgilly] SET DB_CHAINING OFF 
GO
ALTER DATABASE [DWHCARSgilly] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [DWHCARSgilly] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [DWHCARSgilly] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'DWHCARSgilly', N'ON'
GO
ALTER DATABASE [DWHCARSgilly] SET QUERY_STORE = OFF
GO
USE [DWHCARSgilly]
GO
/****** Object:  Table [dbo].[Dim_Cars]    Script Date: 01/02/2024 13:27:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Dim_Cars](
	[CarId] [nvarchar](50) NOT NULL,
	[ProducerId] [int] NULL,
 CONSTRAINT [PK_Dim_Cars] PRIMARY KEY CLUSTERED 
(
	[CarId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Dim_Company]    Script Date: 01/02/2024 13:27:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Dim_Company](
	[CompanyId] [int] IDENTITY(1,1) NOT NULL,
	[CompanyName] [nvarchar](50) NULL,
 CONSTRAINT [PK_Dim_Company] PRIMARY KEY CLUSTERED 
(
	[CompanyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Dim_Customers]    Script Date: 01/02/2024 13:27:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Dim_Customers](
	[CustomerId] [nvarchar](50) NOT NULL,
	[CustomerName] [nvarchar](50) NULL,
	[CustomerPhone] [nvarchar](50) NULL,
 CONSTRAINT [PK_Dim_Customers] PRIMARY KEY CLUSTERED 
(
	[CustomerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Dim_Date]    Script Date: 01/02/2024 13:27:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Dim_Date](
	[Year] [int] NOT NULL,
	[Month] [int] NOT NULL,
	[Day] [int] NOT NULL,
	[Date] [date] NOT NULL,
 CONSTRAINT [PK_Dim_Date] PRIMARY KEY CLUSTERED 
(
	[Date] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Dim_Producer]    Script Date: 01/02/2024 13:27:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Dim_Producer](
	[ProducerId] [int] IDENTITY(1,1) NOT NULL,
	[ProducerName] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Dim_Producer] PRIMARY KEY CLUSTERED 
(
	[ProducerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Exports]    Script Date: 01/02/2024 13:27:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Exports](
	[ExportId] [int] IDENTITY(1,1) NOT NULL,
	[ExportDate] [date] NOT NULL,
 CONSTRAINT [PK_Exports] PRIMARY KEY CLUSTERED 
(
	[ExportId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Fact_Rents_New]    Script Date: 01/02/2024 13:27:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Fact_Rents_New](
	[RentId] [int] IDENTITY(1,1) NOT NULL,
	[CompanyId] [int] NOT NULL,
	[CarId] [nvarchar](50) NOT NULL,
	[CustomerId] [nvarchar](50) NOT NULL,
	[RentDate] [date] NULL,
	[NumDays] [int] NULL,
	[ikm] [numeric](18, 3) NULL,
	[icost] [numeric](18, 3) NULL,
	[producer] [int] NULL,
 CONSTRAINT [PK_Fact_Rents_New] PRIMARY KEY CLUSTERED 
(
	[RentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[rentingtbl]    Script Date: 01/02/2024 13:27:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[rentingtbl](
	[rentid] [int] IDENTITY(1,1) NOT NULL,
	[carid] [int] NULL,
	[dtfrom] [datetime] NULL,
	[dtto] [datetime] NULL,
	[km] [float] NULL,
	[cost] [numeric](18, 3) NULL,
	[idCustomer] [nvarchar](10) NULL,
	[sug] [int] NULL
) ON [PRIMARY]
GO
INSERT [dbo].[Dim_Cars] ([CarId], [ProducerId]) VALUES (N'1003', 1)
INSERT [dbo].[Dim_Cars] ([CarId], [ProducerId]) VALUES (N'106', 3)
INSERT [dbo].[Dim_Cars] ([CarId], [ProducerId]) VALUES (N'11111113', 3)
INSERT [dbo].[Dim_Cars] ([CarId], [ProducerId]) VALUES (N'11111114', 2)
INSERT [dbo].[Dim_Cars] ([CarId], [ProducerId]) VALUES (N'188', 3)
INSERT [dbo].[Dim_Cars] ([CarId], [ProducerId]) VALUES (N'226', 4)
INSERT [dbo].[Dim_Cars] ([CarId], [ProducerId]) VALUES (N'336', 4)
INSERT [dbo].[Dim_Cars] ([CarId], [ProducerId]) VALUES (N'427172812', 3)
INSERT [dbo].[Dim_Cars] ([CarId], [ProducerId]) VALUES (N'539062629', 4)
INSERT [dbo].[Dim_Cars] ([CarId], [ProducerId]) VALUES (N'898', 3)
INSERT [dbo].[Dim_Cars] ([CarId], [ProducerId]) VALUES (N'929', 1)
GO
SET IDENTITY_INSERT [dbo].[Dim_Company] ON 

INSERT [dbo].[Dim_Company] ([CompanyId], [CompanyName]) VALUES (1, N'citycar')
INSERT [dbo].[Dim_Company] ([CompanyId], [CompanyName]) VALUES (2, N'aviv')
SET IDENTITY_INSERT [dbo].[Dim_Company] OFF
GO
INSERT [dbo].[Dim_Customers] ([CustomerId], [CustomerName], [CustomerPhone]) VALUES (N'151897610', N'ראובן151897610', N'012-345678')
INSERT [dbo].[Dim_Customers] ([CustomerId], [CustomerName], [CustomerPhone]) VALUES (N'153871246', N'ראובן153871246', N'012-345678')
INSERT [dbo].[Dim_Customers] ([CustomerId], [CustomerName], [CustomerPhone]) VALUES (N'172550149', N'ראובן172550149', N'012-345678')
INSERT [dbo].[Dim_Customers] ([CustomerId], [CustomerName], [CustomerPhone]) VALUES (N'285554310', N'ראובן285554310', N'012-345678')
INSERT [dbo].[Dim_Customers] ([CustomerId], [CustomerName], [CustomerPhone]) VALUES (N'315856838', N'ראובן', N'123-456785')
INSERT [dbo].[Dim_Customers] ([CustomerId], [CustomerName], [CustomerPhone]) VALUES (N'328110714', N'ראובן328110714', N'012-345678')
INSERT [dbo].[Dim_Customers] ([CustomerId], [CustomerName], [CustomerPhone]) VALUES (N'345159468', N'ראובן345159468', N'012-345678')
INSERT [dbo].[Dim_Customers] ([CustomerId], [CustomerName], [CustomerPhone]) VALUES (N'427172812', N'גרוסברג', N'055-58459408')
INSERT [dbo].[Dim_Customers] ([CustomerId], [CustomerName], [CustomerPhone]) VALUES (N'539062629', N'שמואלזון', N'053-13010944')
INSERT [dbo].[Dim_Customers] ([CustomerId], [CustomerName], [CustomerPhone]) VALUES (N'84770419', N'ראובן84770419', N'012-345678')
GO
INSERT [dbo].[Dim_Date] ([Year], [Month], [Day], [Date]) VALUES (2010, 3, 29, CAST(N'2010-03-29' AS Date))
INSERT [dbo].[Dim_Date] ([Year], [Month], [Day], [Date]) VALUES (2010, 7, 2, CAST(N'2010-07-02' AS Date))
INSERT [dbo].[Dim_Date] ([Year], [Month], [Day], [Date]) VALUES (2010, 9, 21, CAST(N'2010-09-21' AS Date))
INSERT [dbo].[Dim_Date] ([Year], [Month], [Day], [Date]) VALUES (2010, 9, 25, CAST(N'2010-09-25' AS Date))
INSERT [dbo].[Dim_Date] ([Year], [Month], [Day], [Date]) VALUES (2010, 11, 7, CAST(N'2010-11-07' AS Date))
INSERT [dbo].[Dim_Date] ([Year], [Month], [Day], [Date]) VALUES (2011, 4, 2, CAST(N'2011-04-02' AS Date))
INSERT [dbo].[Dim_Date] ([Year], [Month], [Day], [Date]) VALUES (2011, 5, 21, CAST(N'2011-05-21' AS Date))
INSERT [dbo].[Dim_Date] ([Year], [Month], [Day], [Date]) VALUES (2011, 6, 24, CAST(N'2011-06-24' AS Date))
INSERT [dbo].[Dim_Date] ([Year], [Month], [Day], [Date]) VALUES (2022, 3, 17, CAST(N'2022-03-17' AS Date))
INSERT [dbo].[Dim_Date] ([Year], [Month], [Day], [Date]) VALUES (2022, 4, 22, CAST(N'2022-04-22' AS Date))
GO
SET IDENTITY_INSERT [dbo].[Dim_Producer] ON 

INSERT [dbo].[Dim_Producer] ([ProducerId], [ProducerName]) VALUES (1, N'toyota')
INSERT [dbo].[Dim_Producer] ([ProducerId], [ProducerName]) VALUES (2, N'mitzubishi')
INSERT [dbo].[Dim_Producer] ([ProducerId], [ProducerName]) VALUES (3, N'bmw')
INSERT [dbo].[Dim_Producer] ([ProducerId], [ProducerName]) VALUES (4, N'citroen')
SET IDENTITY_INSERT [dbo].[Dim_Producer] OFF
GO
SET IDENTITY_INSERT [dbo].[Exports] ON 

INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (1, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (2, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (3, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (4, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (5, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (6, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (7, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (8, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (9, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (10, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (11, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (12, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (13, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (14, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (15, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (16, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (17, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (18, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (19, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (20, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (21, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (22, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (23, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (24, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (25, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (26, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (27, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (28, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (29, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (30, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (31, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (32, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (33, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (34, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (35, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (36, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (37, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (38, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (39, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (40, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (41, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (42, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (43, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (44, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (45, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (46, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (47, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (48, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (49, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (50, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (51, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (52, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (53, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (54, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (55, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (56, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (57, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (58, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (59, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (60, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (61, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (62, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (63, CAST(N'2024-02-01' AS Date))
INSERT [dbo].[Exports] ([ExportId], [ExportDate]) VALUES (64, CAST(N'2024-02-01' AS Date))
SET IDENTITY_INSERT [dbo].[Exports] OFF
GO
SET IDENTITY_INSERT [dbo].[Fact_Rents_New] ON 

INSERT [dbo].[Fact_Rents_New] ([RentId], [CompanyId], [CarId], [CustomerId], [RentDate], [NumDays], [ikm], [icost], [producer]) VALUES (1, 2, N'11111113', N'427172812', CAST(N'2022-04-22' AS Date), 17, CAST(330.000 AS Numeric(18, 3)), CAST(340.000 AS Numeric(18, 3)), 3)
INSERT [dbo].[Fact_Rents_New] ([RentId], [CompanyId], [CarId], [CustomerId], [RentDate], [NumDays], [ikm], [icost], [producer]) VALUES (2, 2, N'11111114', N'539062629', CAST(N'2022-03-17' AS Date), 98, CAST(1000.000 AS Numeric(18, 3)), CAST(1960.000 AS Numeric(18, 3)), 4)
INSERT [dbo].[Fact_Rents_New] ([RentId], [CompanyId], [CarId], [CustomerId], [RentDate], [NumDays], [ikm], [icost], [producer]) VALUES (3, 1, N'226', N'285554310', CAST(N'2010-03-29' AS Date), 505, CAST(1033.600 AS Numeric(18, 3)), CAST(10100.000 AS Numeric(18, 3)), 4)
INSERT [dbo].[Fact_Rents_New] ([RentId], [CompanyId], [CarId], [CustomerId], [RentDate], [NumDays], [ikm], [icost], [producer]) VALUES (4, 1, N'898', N'151897610', CAST(N'2011-05-21' AS Date), 588, CAST(14.890 AS Numeric(18, 3)), CAST(11760.000 AS Numeric(18, 3)), 3)
INSERT [dbo].[Fact_Rents_New] ([RentId], [CompanyId], [CarId], [CustomerId], [RentDate], [NumDays], [ikm], [icost], [producer]) VALUES (5, 1, N'336', N'315856838', CAST(N'2011-06-24' AS Date), 181, CAST(478.500 AS Numeric(18, 3)), CAST(3620.000 AS Numeric(18, 3)), 1)
INSERT [dbo].[Fact_Rents_New] ([RentId], [CompanyId], [CarId], [CustomerId], [RentDate], [NumDays], [ikm], [icost], [producer]) VALUES (6, 1, N'336', N'345159468', CAST(N'2010-09-25' AS Date), 180, CAST(166.140 AS Numeric(18, 3)), CAST(3600.000 AS Numeric(18, 3)), 4)
INSERT [dbo].[Fact_Rents_New] ([RentId], [CompanyId], [CarId], [CustomerId], [RentDate], [NumDays], [ikm], [icost], [producer]) VALUES (7, 1, N'1003', N'328110714', CAST(N'2010-07-02' AS Date), 261, CAST(684.390 AS Numeric(18, 3)), CAST(5220.000 AS Numeric(18, 3)), 1)
INSERT [dbo].[Fact_Rents_New] ([RentId], [CompanyId], [CarId], [CustomerId], [RentDate], [NumDays], [ikm], [icost], [producer]) VALUES (8, 1, N'106', N'172550149', CAST(N'2011-04-02' AS Date), 231, CAST(548.940 AS Numeric(18, 3)), CAST(4620.000 AS Numeric(18, 3)), 3)
INSERT [dbo].[Fact_Rents_New] ([RentId], [CompanyId], [CarId], [CustomerId], [RentDate], [NumDays], [ikm], [icost], [producer]) VALUES (9, 1, N'188', N'153871246', CAST(N'2010-11-07' AS Date), 492, CAST(868.150 AS Numeric(18, 3)), CAST(9840.000 AS Numeric(18, 3)), 3)
INSERT [dbo].[Fact_Rents_New] ([RentId], [CompanyId], [CarId], [CustomerId], [RentDate], [NumDays], [ikm], [icost], [producer]) VALUES (10, 1, N'929', N'84770419', CAST(N'2010-09-21' AS Date), 526, CAST(773.400 AS Numeric(18, 3)), CAST(10520.000 AS Numeric(18, 3)), 1)
SET IDENTITY_INSERT [dbo].[Fact_Rents_New] OFF
GO
SET IDENTITY_INSERT [dbo].[rentingtbl] ON 

INSERT [dbo].[rentingtbl] ([rentid], [carid], [dtfrom], [dtto], [km], [cost], [idCustomer], [sug]) VALUES (2, 226, CAST(N'2010-03-29T07:07:02.337' AS DateTime), CAST(N'2011-08-16T12:13:40.390' AS DateTime), 1033.6, CAST(10100.000 AS Numeric(18, 3)), N'285554310', 4)
INSERT [dbo].[rentingtbl] ([rentid], [carid], [dtfrom], [dtto], [km], [cost], [idCustomer], [sug]) VALUES (4, 898, CAST(N'2011-05-21T02:21:41.020' AS DateTime), CAST(N'2012-12-29T14:07:11.497' AS DateTime), 14.89, CAST(11760.000 AS Numeric(18, 3)), N'151897610', 3)
INSERT [dbo].[rentingtbl] ([rentid], [carid], [dtfrom], [dtto], [km], [cost], [idCustomer], [sug]) VALUES (11, 336, CAST(N'2010-09-25T11:19:08.590' AS DateTime), CAST(N'2011-03-24T09:46:23.450' AS DateTime), 166.14, CAST(3600.000 AS Numeric(18, 3)), N'345159468', 4)
INSERT [dbo].[rentingtbl] ([rentid], [carid], [dtfrom], [dtto], [km], [cost], [idCustomer], [sug]) VALUES (12, 1003, CAST(N'2010-07-02T04:35:10.560' AS DateTime), CAST(N'2011-03-20T00:17:21.293' AS DateTime), 684.39, CAST(5220.000 AS Numeric(18, 3)), N'328110714', 1)
INSERT [dbo].[rentingtbl] ([rentid], [carid], [dtfrom], [dtto], [km], [cost], [idCustomer], [sug]) VALUES (13, 106, CAST(N'2011-04-02T18:13:41.210' AS DateTime), CAST(N'2011-11-19T02:55:24.063' AS DateTime), 548.94, CAST(4620.000 AS Numeric(18, 3)), N'172550149', 3)
INSERT [dbo].[rentingtbl] ([rentid], [carid], [dtfrom], [dtto], [km], [cost], [idCustomer], [sug]) VALUES (14, 188, CAST(N'2010-11-07T22:53:53.530' AS DateTime), CAST(N'2012-03-13T10:09:12.080' AS DateTime), 868.15, CAST(9840.000 AS Numeric(18, 3)), N'153871246', 3)
INSERT [dbo].[rentingtbl] ([rentid], [carid], [dtfrom], [dtto], [km], [cost], [idCustomer], [sug]) VALUES (15, 929, CAST(N'2010-09-21T20:53:48.007' AS DateTime), CAST(N'2012-02-29T18:26:22.057' AS DateTime), 773.4, CAST(10520.000 AS Numeric(18, 3)), N'84770419', 1)
SET IDENTITY_INSERT [dbo].[rentingtbl] OFF
GO
ALTER TABLE [dbo].[Fact_Rents_New]  WITH CHECK ADD  CONSTRAINT [FK_Fact_Rents_New_Dim_Cars] FOREIGN KEY([CarId])
REFERENCES [dbo].[Dim_Cars] ([CarId])
GO
ALTER TABLE [dbo].[Fact_Rents_New] CHECK CONSTRAINT [FK_Fact_Rents_New_Dim_Cars]
GO
ALTER TABLE [dbo].[Fact_Rents_New]  WITH CHECK ADD  CONSTRAINT [FK_Fact_Rents_New_Dim_Company] FOREIGN KEY([CompanyId])
REFERENCES [dbo].[Dim_Company] ([CompanyId])
GO
ALTER TABLE [dbo].[Fact_Rents_New] CHECK CONSTRAINT [FK_Fact_Rents_New_Dim_Company]
GO
ALTER TABLE [dbo].[Fact_Rents_New]  WITH CHECK ADD  CONSTRAINT [FK_Fact_Rents_New_Dim_Customers] FOREIGN KEY([CustomerId])
REFERENCES [dbo].[Dim_Customers] ([CustomerId])
GO
ALTER TABLE [dbo].[Fact_Rents_New] CHECK CONSTRAINT [FK_Fact_Rents_New_Dim_Customers]
GO
ALTER TABLE [dbo].[Fact_Rents_New]  WITH CHECK ADD  CONSTRAINT [FK_Fact_Rents_New_Dim_Date] FOREIGN KEY([RentDate])
REFERENCES [dbo].[Dim_Date] ([Date])
GO
ALTER TABLE [dbo].[Fact_Rents_New] CHECK CONSTRAINT [FK_Fact_Rents_New_Dim_Date]
GO
ALTER TABLE [dbo].[Fact_Rents_New]  WITH CHECK ADD  CONSTRAINT [FK_Fact_Rents_New_Dim_Producer] FOREIGN KEY([producer])
REFERENCES [dbo].[Dim_Producer] ([ProducerId])
GO
ALTER TABLE [dbo].[Fact_Rents_New] CHECK CONSTRAINT [FK_Fact_Rents_New_Dim_Producer]
GO
/****** Object:  StoredProcedure [dbo].[GetTableProc]    Script Date: 01/02/2024 13:27:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[GetTableProc]
as
begin
return select Fact_Rents_New.CarId,Dim_Company.CompanyName,Dim_Customers.CustomerName,Dim_Customers.CustomerPhone,Fact_Rents_New.icost,Fact_Rents_New.ikm,Fact_Rents_New.NumDays,Fact_Rents_New.RentDate,Fact_Rents_New.RentId,ProducerName 
from Fact_Rents_New,Dim_Producer,Dim_Cars,Dim_Company,Dim_Customers 
end
GO
/****** Object:  StoredProcedure [dbo].[GetTableProc1]    Script Date: 01/02/2024 13:27:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[GetTableProc1]
as
begin
return select Dim_Cars.CarId, ProducerName, sum(NumDays)as 'total rent time',sum(icost) as 'total cost' from Dim_Cars, Dim_Producer, Fact_Rents_New where Dim_Cars.ProducerId=Dim_Producer.ProducerId and Fact_Rents_New.CarId=Dim_Cars.CarId group by Dim_Cars.CarId, ProducerName
end
GO
/****** Object:  StoredProcedure [dbo].[GetTableProc11]    Script Date: 01/02/2024 13:27:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[GetTableProc11]
as
begin
 select Dim_Cars.CarId, ProducerName, sum(NumDays)as 'total rent time',sum(icost) as 'total cost' from Dim_Cars, Dim_Producer, Fact_Rents_New where Dim_Cars.ProducerId=Dim_Producer.ProducerId and Fact_Rents_New.CarId=Dim_Cars.CarId group by Dim_Cars.CarId, ProducerName
end
GO
/****** Object:  StoredProcedure [dbo].[GetTableProc2]    Script Date: 01/02/2024 13:27:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[GetTableProc2]
as
begin
 select Fact_Rents_New.CarId,Dim_Company.CompanyName,Dim_Customers.CustomerName,Dim_Customers.CustomerPhone,Fact_Rents_New.icost,Fact_Rents_New.ikm,Fact_Rents_New.NumDays,Fact_Rents_New.RentDate,Fact_Rents_New.RentId,ProducerName 
from Fact_Rents_New,Dim_Producer,Dim_Cars,Dim_Company,Dim_Customers 
end
GO
/****** Object:  StoredProcedure [dbo].[GetTableProc3]    Script Date: 01/02/2024 13:27:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[GetTableProc3]
as
begin
select distinct CarId,ProducerName,(select sum(icost) from Fact_Rents_New as q1 where q.CarId=q1.CarId) as 'sum cost' from Fact_Rents_New as q, Dim_Producer
end
GO
USE [master]
GO
ALTER DATABASE [DWHCARSgilly] SET  READ_WRITE 
GO
