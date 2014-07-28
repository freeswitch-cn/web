#
# FreeSWITCH auto-build Multiplatform Makefile
# http://www.freeswitch.org
# put this file anywhere and type make to
# create a fully-built freeswitch.git from scratch
# in that same directory.
#
# REQUIRES GNU make:
#
# CentOS 6.x: yum install make
# Fedora: yum install make
# Debian: apt-get install make
# Ubuntu: apt-get install make
# Gentoo: emerge gmake
# FreeBSD 8/9: pkg_add -r gmake
# FreeBSD 10: pkg install gmake
# OpenBSD 5.x: pkg_add -r gmake
# DragonFly 3.x: pkg_radd gmake
# Mac OS X 10.7/10.8/10.9: http://brew.sh and Developer Tools from Apple
# NetBSD: pkg_add -v gmake

# Deps if needed install prefix
INSTALL_PREFIX=/usr/local
OPENSSL_PREFIX=$(INSTALL_PREFIX)

# FreeSWITCH Install prefix
FREESWITCH_PREFIX=/usr/local/freeswitch

# Define versions of tools we'll build if needed.
AUTOCONF  = 2.69
AUTOMAKE  = 1.14
LIBTOOL   = 2.4
PKGCONFIG = 0.28
JPEG      = v8d
OPENSSL   = 1.0.1f
OPUS      = 1.1
SPEEX     = 1.2rc1
# Figure out if we can fetch things.
FETCH     := $(shell which fetch 2>/dev/null)
WGET      := $(shell which wget 2>/dev/null)
CURL      := $(shell which curl 2>/dev/null)
CUT       := $(shell which cut 2>/dev/null)
TAR       := $(shell which tar 2>/dev/null)
UID       := $(shell id -u)
UNAME     := $(shell uname -s)
UNAME_RS  := $(shell uname -rs | $(CUT) -d. -f1)
UNAME_R   := $(shell uname -r)
ARCH      := $(shell uname -m)
NETBSDPKG := http://ftp.netbsd.org/pub/pkgsrc/packages

# Define sudo if we aren't root.
ifneq ($(UID),0)
SUDO      := $(shell which sudo)
endif

# Linuxy stuffs here.
ifeq ($(UNAME),Linux)
USE_MAKE=make
YUM    := $(shell which yum 2>/dev/null)
APT    := $(shell which apt-get 2>/dev/null)
PACMAN := $(shell which pacman 2>/dev/null)
EMERGE := $(shell which emerge 2>/dev/null)

ifdef YUM
PKGADD  := $(YUM)
PKGLIST := git gcc-c++ autoconf automake libtool python ncurses-devel zlib-devel libjpeg-devel openssl-devel e2fsprogs-devel \
	curl-devel pcre-devel speex-devel
INSTALL := $(YUM) install $(PKGLIST)
#MAKEDEP   = opus
endif #End YUM
ifdef APT
PKGADD  := $(APT)
PKGLIST := git build-essential automake autoconf libtool python zlib1g-dev libjpeg-dev libncurses5-dev \
	libssl-dev libpcre3-dev libspeexdsp-dev libspeex-dev libcurl4-openssl-dev libopus-dev \
	libsqlite3-dev libldns-dev libedit-dev
INSTALL := $(APT) install $(PKGLIST)
endif #End APT
ifdef PACMAN
PKGADD  := $(PACMAN)
PKGLIST := git automake autoconf libtool python zlib libjpeg curl speex pcre pkg-config opus
INSTALL := $(PACMAN) -S $(PKGLIST)
endif #End PACMAN
ifdef EMERGE
# Untested FUCK GENTOO, 3 tries and it still won't install
PKGADD  := $(EMERGE)
PKGLIST := dev-vcs/git automake autoconf libtool python zlib jpeg openssl dev-libs/pcre++ speex curl pkg-config opus
INSTALL := $(EMERGE) $(PKGLIST)
endif #End EMERGE

endif #End Linux

# Mac OS Xiy stuffs here.
ifeq ($(UNAME),Darwin)
USE_MAKE=make
PKGADD        := $(shell which brew 2>/dev/null)
OPENSSL_TARGET = darwin64-$(ARCH)-cc
OPENSSL_PREFIX = /usr/local/opt/openssl
PKGLIST        = autoconf automake libtool pkg-config libjpeg openssl curl speex pcre opus
INSTALL       := $(PKGADD) install $(PKGLIST)

ifeq ($(UNAME_RS),Darwin 13)
endif #End Darwin 13

ifeq ($(UNAME_RS),Darwin 12)
endif #End Darwin 12

ifeq ($(UNAME_RS),Darwin 11)
endif #End Darwin 11

endif #End Darwin

# FreeBSD Beasty thingys here.
ifeq ($(UNAME),FreeBSD)
USE_MAKE=gmake
PKGLIST = git automake autoconf libtool bzip2 jpeg openssl curl speex pcre opus pkgconf

ifeq ($(UNAME_RS),FreeBSD 10)
PKGADD  = $(shell which pkg)
INSTALL = $(PKGADD) install $(PKGLIST)
endif #End FreeBSD 10

ifeq ($(UNAME_RS),FreeBSD 9)
PKGADD  = $(shell which pkg)
INSTALL = $(PKGADD) -r $(PKGLIST)
endif #End FreeBSD 9
ifeq ($(UNAME_RS),FreeBSD 8)
BUILDV8 = false
PKGADD  = $(shell which pkg_add)
INSTALL = $(PKGADD) -r $(PKGLIST)
endif #End FreeBSD 8

endif #End FreeBSD

# Blowfishy thingys here.
ifeq ($(UNAME),OpenBSD)
USE_MAKE=gmake

ifeq ($(UNAME_RS),OpenBSD 5)
PKGADD  = $(shell which pkg_add)
PKGLIST = rsync-3.0.9p3 git automake-1.13.1 autoconf-2.69p0 libtool bzip2 jpeg curl speex opus libncurses
INSTALL = $(PKGADD) -r $(PKGLIST)
BOOTSTRAP = AUTOCONF_VERSION=2.69 AUTOMAKE_VERSION=1.13 LIBTOOL=/usr/local/bin/libtoolize
endif #End OpenBSD 5

endif #End OpenBSD

# Daemony thingys here.
ifeq ($(UNAME),NetBSD)
USE_MAKE=gmake

ifeq ($(UNAME_RS),NetBSD 6)
PKGADD  = $(shell which pkg_add)
PKGLIST = rsync git automake autoconf libtool bzip2 jpeg curl speex pcre opus pkg-config openssl-1.0.1f
PKGSRC := PKG_PATH=$(NETBSDPKG)/$(UNAME)/$(ARCH)/$(UNAME_R)/All
INSTALL:= $(PKGSRC) $(PKGADD) -v $(PKGLIST)
endif #End NetBSD 6

endif #End NetBSD

# Suny thingys here.
ifeq ($(UNAME),SunOS)
USE_MAKE=gmake
OPENSSL_TARGET = solaris64-x86_64-gcc
INSTALL_PREFIX = /opt/64
FREESWITCH_PREFIX=/opt/freeswich

CFLAGS   :=-m64 $(CFLAGS)
CXXFLAGS :=-m64 $(CXXFLAGS)
LDFLAGS  :=-m64 $(LDFLAGS)

ifeq ($(UNAME_RS),SunOS 5)
PKGADD    = $(shell which pkg)
PKGLIST   = git autoconf automake libtool libjpeg gcc-45 curl speex pcre
INSTALL   = $(PKGADD) install $(PKGLIST)
FSCONFARG = --enable-64
MAKEDEP   = openssl opus pkg-config
endif #End SunOS 5

endif #End SunOS

# Buzzy flappy thingys here.
ifeq ($(UNAME),DragonFly)
USE_MAKE=gmake

ifeq ($(UNAME_RS),DragonFly 3)
PKGADD  = $(shell which pkg)
PKGLIST = git automake autoconf libtool bzip2 jpeg openssl curl speex pcre opus pkgconf
INSTALL = $(PKGADD) install $(PKGLIST)
endif #End DragonFly 3

endif #End DragonFly

# Now How are we going to download thingys when we need to?
ifdef FETCH
DOWNLOADER=$(FETCH) -4 -o
endif
ifdef CURL
DOWNLOADER=$(CURL) -4 -o
endif
ifdef WGET
DOWNLOADER=$(WGET) -4 -O
endif

# build flags for below
MYFLAGS := CFLAGS=$(CFLAGS) LDFLAGS=$(LDFLAGS) CXXFLAGS=$(CXXFLAGS)


all: welcome deps has-git freeswitch

welcome:
	@echo $(BUILD_FLAGS)
	@echo "Welcome to the FreeSWITCH installer"
	@echo "Build for platform: $(UNAME)/$(ARCH)"
	@echo "Using '$(DOWNLOADER)' to download resources." 
ifdef OPENSSL_TARGET
	@echo "OpenSSL build target: $(OPENSSL_TARGET)"
endif #End OPENSSL_TARGET
ifdef PKGLIST
	@echo "Package install list '$(PKGLIST)'"
ifdef PKGADD
	@echo "Using '$(PKGADD)' to install Packages"
endif #End INSTALL
endif #End PKGLIST
ifdef MAKEDEP
	@echo "Build dependancy list $(MAKEDEP)"
endif #End MAKEDEP
	@echo "Staring in 10 seconds, CTRL+C to stop the installation"
	@sleep 10

has-git:
	@git --version || (echo "please install git" && false)

freeswitch: freeswitch.git/Makefile
	cd freeswitch.git && $(BOOTSTRAP) $(USE_MAKE)

freeswitch.git/Makefile: freeswitch.git/configure
	cd freeswitch.git && $(MYFLAGS) ./configure $(FSCONFARG) --prefix=$(INSTALL_PREFIX)

freeswitch.git/configure: freeswitch.git/bootstrap.sh
	cd freeswitch.git && $(BOOTSTRAP) sh bootstrap.sh

freeswitch.git/bootstrap.sh: has-git
	(test -d freeswitch.git) || git clone https://stash.freeswitch.org/scm/fs/freeswitch.git

install: freeswitch
	cd freeswitch.git && $(BOOTSTRAP) $(USE_MAKE) install

sounds-install:
	cd freeswitch.git && $(BOOTSTRAP) $(USE_MAKE) cd-sounds-install cd-moh-install

samples:
	cd freeswitch.git && $(BOOTSTRAP) $(USE_MAKE) samples

deps: makedeps
	@($(INSTALL)) || true
	@echo "Deps installed."

# Keeping these around, I'll add what is missing for die hard from source users.

autoconf: autoconf-$(AUTOCONF)

autoconf-$(AUTOCONF):
	(test -d $@) || ($(DOWNLOADER) $@.tar.gz http://ftp.gnu.org/gnu/autoconf/$@.tar.gz && $(TAR) zxf $@.tar.gz)
	(cd $@ && ./configure $(MYFLAGS) --prefix=$(INSTALL_PREFIX) && $(USE_MAKE) && $(SUDO) $(USE_MAKE) install && touch .done)

automake: automake-$(AUTOMAKE)

automake-$(AUTOMAKE):
	(test -d $@) || ($(DOWNLOADER) $@.tar.gz http://ftp.gnu.org/gnu/automake/$@.tar.gz && $(TAR) zxf $@.tar.gz)
	(cd $@ && ./configure $(MYFLAGS) --prefix=$(INSTALL_PREFIX) && $(USE_MAKE) && $(SUDO) $(USE_MAKE) install)

libtool: libtool-$(LIBTOOL)

libtool-$(LIBTOOL):
	(test -d $@) || ($(DOWNLOADER) $@.tar.gz http://ftp.gnu.org/gnu/libtool/$@.tar.gz && $(TAR) zxf $@.tar.gz)
	(cd $@ && ./configure $(MYFLAGS) --program-prefix=g --prefix=$(INSTALL_PREFIX) && $(USE_MAKE) && $(SUDO) $(USE_MAKE) install)

pkg-config: pkg-config-$(PKGCONFIG) 

pkg-config-$(PKGCONFIG):
	(test -d $@) || ($(DOWNLOADER) $@.tar.gz http://pkgconfig.freedesktop.org/releases/$@.tar.gz && $(TAR) zxf $@.tar.gz)
	(cd $@ && ./configure $(MYFLAGS) --prefix=$(INSTALL_PREFIX) --with-internal-glib &&\
	$(USE_MAKE) && $(SUDO) $(USE_MAKE) uninstall  && $(SUDO) $(USE_MAKE) install)

libjpeg: jpeg-8d/Makefile

jpeg-8d/Makefile:
	(test -d jpeg-8d) || ($(DOWNLOADER) jpegsrc.$(JPEG).tar.gz http://www.ijg.org/files/jpegsrc.$(JPEG).tar.gz && $(TAR) zxf jpegsrc.$(JPEG).tar.gz)
	(cd jpeg-8d && ./configure $(MYFLAGS) --prefix=$(INSTALL_PREFIX) && $(USE_MAKE) && $(SUDO) $(USE_MAKE) install)

openssl: openssl-$(OPENSSL)

openssl-$(OPENSSL):
	(test -d $@) || ($(DOWNLOADER) $@.tar.gz http://www.openssl.org/source/$@.tar.gz && $(TAR) zxf $@.tar.gz)
	(cd $@ && $(MYFLAGS) ./Configure --prefix=$(OPENSSL_PREFIX) $(OPENSSL_TARGET) shared && $(USE_MAKE) && $(SUDO) $(USE_MAKE) install)

opus: opus-$(OPUS)

opus-$(OPUS):
	(test -d $@) || ($(DOWNLOADER) $@.tar.gz http://downloads.xiph.org/releases/opus/$@.tar.gz && $(TAR) zxf $@.tar.gz)
	(cd $@ && ./configure $(MYFLAGS) --prefix=$(INSTALL_PREFIX) && $(USE_MAKE) && $(SUDO) $(USE_MAKE) install)

speex: speex-$(SPEEX)

speex-$(SPEEX):
	(test -d $@) || ($(DOWNLOADER) $@.tar.gz http://downloads.xiph.org/releases/speex/$@.tar.gz && $(TAR) zxf $@.tar.gz)
	(cd $@ && ./configure $(MYFLAGS) --prefix=$(INSTALL_PREFIX) && $(USE_MAKE) && $(SUDO) $(USE_MAKE) install)

makedeps: $(MAKEDEP)

