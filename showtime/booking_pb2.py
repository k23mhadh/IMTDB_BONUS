# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# NO CHECKED-IN PROTOBUF GENCODE
# source: booking.proto
# Protobuf Python Version: 5.27.2
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import runtime_version as _runtime_version
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
_runtime_version.ValidateProtobufRuntimeVersion(
    _runtime_version.Domain.PUBLIC,
    5,
    27,
    2,
    '',
    'booking.proto'
)
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\rbooking.proto\x12\x07\x62ooking\"\x07\n\x05\x45mpty\"\x18\n\x06UserId\x12\x0e\n\x06userid\x18\x01 \x01(\t\"?\n\x0e\x42ookingRequest\x12\x0e\n\x06userid\x18\x01 \x01(\t\x12\x0f\n\x07movieid\x18\x02 \x01(\t\x12\x0c\n\x04\x64\x61te\x18\x03 \x01(\t\"\"\n\x0f\x42ookingResponse\x12\x0f\n\x07message\x18\x01 \x01(\t\">\n\x07\x42ooking\x12\x0e\n\x06userid\x18\x01 \x01(\t\x12#\n\x05\x64\x61tes\x18\x02 \x03(\x0b\x32\x14.booking.BookingDate\"+\n\x0b\x42ookingDate\x12\x0c\n\x04\x64\x61te\x18\x01 \x01(\t\x12\x0e\n\x06movies\x18\x02 \x03(\t\"1\n\x0b\x42ookingList\x12\"\n\x08\x62ookings\x18\x01 \x03(\x0b\x32\x10.booking.Booking2\xc2\x01\n\x0e\x42ookingService\x12\x36\n\x0eGetAllBookings\x12\x0e.booking.Empty\x1a\x14.booking.BookingList\x12\x34\n\x0fGetUserBookings\x12\x0f.booking.UserId\x1a\x10.booking.Booking\x12\x42\n\rCreateBooking\x12\x17.booking.BookingRequest\x1a\x18.booking.BookingResponseb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'booking_pb2', _globals)
if not _descriptor._USE_C_DESCRIPTORS:
  DESCRIPTOR._loaded_options = None
  _globals['_EMPTY']._serialized_start=26
  _globals['_EMPTY']._serialized_end=33
  _globals['_USERID']._serialized_start=35
  _globals['_USERID']._serialized_end=59
  _globals['_BOOKINGREQUEST']._serialized_start=61
  _globals['_BOOKINGREQUEST']._serialized_end=124
  _globals['_BOOKINGRESPONSE']._serialized_start=126
  _globals['_BOOKINGRESPONSE']._serialized_end=160
  _globals['_BOOKING']._serialized_start=162
  _globals['_BOOKING']._serialized_end=224
  _globals['_BOOKINGDATE']._serialized_start=226
  _globals['_BOOKINGDATE']._serialized_end=269
  _globals['_BOOKINGLIST']._serialized_start=271
  _globals['_BOOKINGLIST']._serialized_end=320
  _globals['_BOOKINGSERVICE']._serialized_start=323
  _globals['_BOOKINGSERVICE']._serialized_end=517
# @@protoc_insertion_point(module_scope)